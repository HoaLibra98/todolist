import { save } from "../../../datacache-provider";
function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: "TASK-UPDATE-DATA",
      data: data,
    });
  };
}
function createOrEdit(payload) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let listData = getState().task.listData || [];
      if (payload.id) {
        if (listData.some((el) => el.id === payload.id)) {
          let data = (listData || []).map((item, index) => {
            if (item.id === payload?.id) {
              listData[index] = payload;
              return payload;
            }
            return item;
          });
          dispatch(
            updateData({
              listData: data.sort(
                (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
              ),
            })
          );
          save("TASK_LIST", data);
        }
        resolve();
      } else {
        let dataSort = listData.sort((a, b) => b.id - a.id);
        let idNew = ((dataSort || []).length && dataSort[0].id) || 0;
        let data = [...listData, { ...payload, id: idNew + 1 }];
        dispatch(
          updateData({
            listData: data.sort(
              (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
            ),
          })
        );
        save("TASK_LIST", data);
        resolve();
      }
    });
  };
}
function onRemove(payload) {
  return (dispatch, getState) => {
    let listData = getState().task.listData || [];
    let data = [];
    if (Array.isArray(payload)) {
      data = listData.filter(
        (item) => !payload.some((el) => el.id === item.id)
      );
    } else {
      data = listData.filter((item) => item.id !== payload.id);
    }
    dispatch(
      updateData({
        listData: data,
      })
    );
    save("TASK_LIST", data);
  };
}
export default { updateData, createOrEdit, onRemove };
