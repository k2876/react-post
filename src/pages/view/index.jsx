import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { CreateButton } from "../list";

export default function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const getData = () => {
    if (!id) return;
    useAxios
      .get(`/list/${id}`)
      .then(({ data }) => {
        setData(data);
      })
      .catch(() => {
        navigate("/");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  const goModify = () => {
    navigate("/add", { state: { id } });
  };

  const deleteData = async () => {
    let ask = window.confirm("정말 삭제하시겠습니다");
    if (!ask) return;

    await useAxios.delete(`/list/${id}`);
    alert("삭제되었습니다.");
    navigate("/");
  };
  useEffect(() => {
    getData();
  }, [id]);

  if (loading) return <Text>로딩중...</Text>;
  return (
    <>
      <Text>고유번호 : {data?.id ?? "-"}</Text>
      <Text>공지사항 : {data?.category ?? "-"}</Text>
      <Text>제목 : {data?.title ?? "-"}</Text>
      <Text>콘텐츠 : {data?.contents ?? "-"}</Text>
      <Text>작성일시 : {data?.date ?? "-"}</Text>

      <Button onClick={goModify}>게시글 수정</Button>
      <Button onClick={deleteData}>게시글 삭제</Button>
    </>
  );
}

const Text = styled.div`
  margin-bottom: 10px;
`;

const Button = styled(CreateButton)`
  &:hover {
    background-color: #000;
  }
`;
