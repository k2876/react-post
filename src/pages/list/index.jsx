import { useEffect, useState } from "react";
import styled from "styled-components";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

const headerList = ["#", "카테고리", "컨텐츠", "작성일시"];

export default function List() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  /** 게시글 작성 */
  const goCreate = () => {
    navigate("/add");
  };

  /** 상세페이지 이동 */
  const goDetail = (id) => {
    navigate("/" + id);
  };

  const getList = async () => {
    const { data } = await useAxios.get("/list");
    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <CreateButton onClick={goCreate}>게시글 작성하기</CreateButton>
      <Table>
        <thead>
          <tr>
            {headerList.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <th colSpan={4}>로딩중</th>
            </tr>
          ) : (
            list.map((item, i) => (
              <tr onClick={() => goDetail(item.id)} key={item.id}>
                <th>{i + 1}</th>
                <th>{item.category}</th>
                <th>{item.contents}</th>
                <th>{item.date}</th>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
}

export const CreateButton = styled.button`
  background-color: #aaa;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0 5px 5px;
  &:hover {
    background-color: #000;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody > tr:hover {
    background-color: #ddd;
    cursor: pointer;
  }

  th,
  td {
    border: 1px solid #aaa;
    padding: 3px;
  }
`;
