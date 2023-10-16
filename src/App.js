import { Route, Routes } from "react-router-dom";
import List from "./pages/list";
import View from "./pages/view";
import Write from "./pages/write";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path="/add" element={<Write />} />
      <Route path="/:id" element={<View />} />
    </Routes>
  );
}
/**
 * 기술스택
 * react (hook)
 * scss + css in js 방법 (css module)
 * react-router-dom
 * axios (통신 로직)
 * zustand (전역 상태 관리)
 */
