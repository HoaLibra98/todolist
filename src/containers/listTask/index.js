import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./style.scss";
import { read } from "../../datacache-provider";
import actionTask from "../../redux-store/action/task";
import CreateUpdateTask from "../createTask";
function App(props) {
  const { listData, updateData, onRemove } = props;
  const [state, _setState] = useState({ currentBulk: [] });
  const setState = (data = {}) => {
    _setState((state) => {
      return { ...state, ...data };
    });
  };
  useEffect(() => {
    if (!state.valueSearch) {
      let data = read("TASK_LIST", []);
      if (data && data.length) {
        updateData({
          listData: data.sort(
            (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
          ),
        });
      }
    }
  }, [state.valueSearch]);
  const openEdit = (item) => {
    setState({ currentItem: item });
  };
  const setCurrentItem = () => {
    setState({ currentItem: {} });
  };
  const onRemoveTask = (item) => {
    onRemove(item);
  };
  const onSearch = (value) => {
    let valueSearch = value?.trim().toLowerCase().unsignText();
    let dataSearch = listData?.filter(
      (option) =>
        option?.title?.toLowerCase().unsignText().indexOf(valueSearch) >= 0
    );
    setState({
      valueSearch: valueSearch || "",
    });
    updateData({
      listData: dataSearch,
    });
  };
  const onBulk = (item) => (e) => {
    let data = [];
    if (e.target.checked) {
      data = [...state.currentBulk, item];
    } else {
      data = [...state.currentBulk.filter((el) => el.id !== item.id)];
    }
    setState({
      currentBulk: data,
    });
  };
  const onRemoveBulk = () => {
    onRemoveTask(state.currentBulk);
    setState({
      currentBulk: [],
    });
  };
  return (
    <div className="list-task">
      <div className="title">To Do List</div>
      <input
        placeholder="search.."
        className="input-search"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div
        className={`box-list-task ${
          !!state.currentBulk.length && "box-list-taskBuilk"
        }`}
      >
        {(listData || []).length
          ? listData.map((item, index) => {
              return (
                <>
                  <div className="content-list" key={index}>
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      onClick={onBulk(item)}
                    />
                    <div className="name">{item.title}</div>
                    <div className="action">
                      <button
                        className="btn-detail"
                        onClick={() => {
                          openEdit(item);
                        }}
                      >
                        Detail
                      </button>
                      <button
                        className="btn-remove"
                        onClick={() => {
                          onRemoveTask(item);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  {item.id === state.currentItem?.id && (
                    <CreateUpdateTask
                      item={item}
                      setCurrentItem={setCurrentItem}
                    />
                  )}
                </>
              );
            })
          : ""}
      </div>
      {!!state.currentBulk.length && (
        <div className="bulk">
          <div>Bulk Action:</div>
          <div className="action">
            <button className="btn-detail">Done</button>
            <button
              className="btn-remove"
              onClick={() => {
                onRemoveBulk();
              }}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default connect(
  (state) => {
    const {
      task: { listData = [] },
    } = state;
    return { listData };
  },
  {
    updateData: actionTask.updateData,
    onRemove: actionTask.onRemove,
  }
)(App);
