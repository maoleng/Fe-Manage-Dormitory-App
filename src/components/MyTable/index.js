import { useState } from "react";
import { Table } from "react-bootstrap";

import Tag1 from "./Tag1.png";
import MyPagination from "~/components/MyPagination";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleCheck,
  faCircleArrowUp,
} from "@fortawesome/free-solid-svg-icons";
function MyTable({ forms }) {
  // console.log("Component: MyTable");

  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState({ key: "", isASC: false });

  let formsWrap = !inputValue.length
    ? forms
    : forms.filter((elem) => {
        for (let key in elem) {
          if (
            ("" + elem[key].content)
              .toLowerCase()
              .includes(inputValue.toLowerCase())
          ) {
            return true;
          }
        }

        return false;
      });
  if (!formsWrap.length) {
    formsWrap = [{}];
  }
  if (sort.key !== "") {
    formsWrap.sort((a, b) => {
      if (isNaN(-(-a[sort.key].content))) {
        return a[sort.key].content < b[sort.key].content
          ? sort.isASC
            ? 1
            : -1
          : sort.isASC
          ? -1
          : 1;
      } else {
        return a[sort.key].content - b[sort.key].content > 0
          ? sort.isASC
            ? 1
            : -1
          : sort.isASC
          ? -1
          : 1;
      }
    });
  }

  const pages = [...Array(Math.ceil(formsWrap.length / 10)).keys()];

  function search(e) {
    setInputValue(e.target.value);
    setPage(0);
  }

  function sortforms(key) {
    setSort(
      key !== sort.key ? { key, isASC: false } : { ...sort, isASC: !sort.isASC }
    );
    setPage(0);
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginTop: "12px",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src={Tag1}
            style={{
              marginRight: "12px",
              width: "24px",
              height: "16px",
              marginBottom: "4px",
            }}
            alt="thẻ tag"
          ></img>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#0B42AB" }}
          />
          <input
            onChange={search}
            style={{ margin: "0 12px 0 8px", borderStyle: "none none solid none", outline: 'none' }}
            type="text"
            value={inputValue}
            placeholder="Tìm kiếm..."
          />
        </div>
      </div>

      {!Object.keys(formsWrap[0]).length ? (
        <>Không có dữ liệu</>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                {Object.keys(formsWrap[0]).map((elem) => (
                  <th
                    style={{
                      textAlign: formsWrap[0][elem].center ? "center" : "left",
                    }}
                    onClick={() => sortforms(elem)}
                    key={elem}
                  >
                    {formsWrap[0][elem].title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formsWrap.slice((+page)*10, (+page)*10 + 10).map((elem, index) => (
                <tr key={index}>
                  {Object.keys(formsWrap[0]).map((key, index) => (
                    <td key={index}>{elem[key].content}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MyPagination
              pages={pages}
              page={page}
              setPage={setPage}
            ></MyPagination>
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#0B42ABFF",
            }}
          >
            Result:{" "}
            {!Object.keys(formsWrap[0]).length
              ? "0"
              : +page * 10 +
                1 +
                " - " +
                (+page * 10 + 10 < formsWrap.length
                  ? +page * 10 + 10
                  : formsWrap.length) +
                " of " +
                formsWrap.length}
          </div>
        </>
      )}
    </div>
  );
}

export default MyTable;
