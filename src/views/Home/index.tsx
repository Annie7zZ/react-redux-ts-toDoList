import React, { useEffect, useState } from "react";
import style from "./home.module.scss";
import { Input, Button, Checkbox, message, Modal } from "antd";
import { nanoid } from "nanoid";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
interface toDo {
  id: string;
  title: string;
  isDone: boolean;
}
const { Search } = Input;
export default function Home() {
  const todos = useSelector((state) => state);
  const [total, setTotal] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [selectItem, setSelectItem] = useState({});
  useEffect(() => {
    const copyState = JSON.parse(JSON.stringify(todos));
    setTotal(copyState.length);
    setDoneCount(
      copyState.reduce(
        (pre: number, todo: toDo) => pre + (todo.isDone ? 1 : 0),
        0
      )
    );
  }, [todos]);
  const inputChange = (e: any) => {
    setSearchVal(e.target.value);
  };
  const addTodo = (value: string) => {
    if (value.trim()) {
      const newTodo = { id: nanoid(), title: value.trim(), isDone: false };
      dispatch({ data: newTodo, type: "add_todo" });
      setSearchVal("");
    } else {
      message.warning("不能输入空格");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (data: toDo) => {
    setIsModalOpen(true);
    setSelectItem(data);
  };
  const handleOk = () => {
    dispatch({ data: selectItem, type: "deleteTodo" });
    setIsModalOpen(false);
  };
  const changeIsDone = (data: toDo) => {
    dispatch({ data: data, type: "changeIsDone" });
  };
  const changeAll = (e: CheckboxChangeEvent) => {
    dispatch({ data: e.target.checked, type: "changeAll" });
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>ToDoList</h2>
      <div>
        <Search
          placeholder="What need to be done？"
          enterButton="添加"
          size="middle"
          onSearch={addTodo}
          value={searchVal}
          onChange={inputChange}
        />
      </div>
      <div className={style.list}>
        <ul>
          {store.getState()?.map((item) => {
            return (
              <li
                key={item.id}
                style={{ textDecoration: item.isDone ? "line-through" : "" }}
              >
                <Checkbox
                  checked={item.isDone}
                  onChange={() => changeIsDone(item)}
                ></Checkbox>
                <span style={{ marginLeft: "10px" }}>{item.title}</span>&nbsp;
                <Button
                  size="small"
                  type="primary"
                  danger
                  onClick={() => handleDelete(item)}
                  className={style.btn}
                >
                  删除
                </Button>
              </li>
            );
          })}
        </ul>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确定"
          width={350}
        >
          确定要删除吗？
        </Modal>
      </div>
      <div className={style.bottom}>
        <Checkbox
          onChange={changeAll}
          checked={doneCount === total && total !== 0 ? true : false}
          style={{ marginRight: "10px" }}
          disabled={total === 0 ? true : false}
        ></Checkbox>
        <span style={{ marginRight: "10px" }}>全选</span>
        <span>总共{total}</span>，<span>已完成{doneCount}</span>
      </div>
    </div>
  );
}
