import styled from "styled-components";
import { CreateButton } from "../list";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function Write() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.id;
  const txt = id ? "수정" : "생성";

  const [value, setValue] = useState({
    title: "",
    category: "",
    contents: "",
  });

  /** 게시글 상세정보 조회 */
  const getData = () => {
    if (!id) return;
    useAxios
      .get(`/list/${id}`)
      .then(({ data }) => {
        setValue(data);
      })
      .catch(() => {
        navigate("/" + id);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const changeValue = (key, val) => {
    setValue((prev) => ({ ...prev, [key]: val }));
  };

  const submit = async () => {
    if (!value?.title) return;
    if (!value?.category) return;
    if (!value?.contents) return;

    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const sendData = { ...value };
    sendData.date = date;

    const method = id ? "put" : "post";
    const url = "/list" + (id ? "/" + id : "");

    await useAxios[method](url, sendData);
    alert(txt + "되었습니다");
    navigate("/");
  };

  return (
    <>
      <Text>
        제목 :{" "}
        <input
          value={value?.title}
          onChange={(e) => changeValue("title", e.target.value)}
        />
      </Text>
      <Text>
        카테고리 :{" "}
        <input
          value={value?.category}
          onChange={(e) => changeValue("category", e.target.value)}
        />
      </Text>
      <Text>
        콘텐츠 :{" "}
        <input
          value={value?.contents}
          onChange={(e) => changeValue("contents", e.target.value)}
        />
      </Text>

      <CreateButton onClick={submit}>게시글 {txt}</CreateButton>
    </>
  );
}

const Text = styled.div`
  margin-bottom: 10px;
`;
