import { ObjectID } from "bson";
import store from "store";
import {
  PUT_DATA,
  UPSERT,
  SET_STATE,
  DELETE,
} from "store/reducers/imagesSlice";
import { DataStates, NetworkStates } from "store/states";
import { fetcher } from "utils";
import { query_builder } from "utils/helpers";

const create = (file) => {
  const fn = async (dispatch, getState) => {
    const id = ObjectID().toString();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("upload", file);
    dispatch(UPSERT({ image: { status: DataStates.IN_FLIGHT, id } }));
    const response = await fetcher(`/api/media/${id}`, {
      method: "POST",
      body: formData,
    });

    dispatch(UPSERT({ image: { ...response, status: DataStates.PERSISTED } }));
  };

  store.dispatch(fn);
};

const deleteImage = (id) => {
  const fn = (dispatch, getState) => {
    dispatch(DELETE({ id }));
    return fetcher(`/api/media/${id}`, {
      method: "DELETE",
    });
  };
  store.dispatch(fn);
};

const fetch = (refetch = false) => {
  const fn = (dispatch, getState) => {
    const state = getState();
    if (state.images.next == null && refetch == false) {
      return;
    }
    dispatch(
      SET_STATE(
        state.images.next ? NetworkStates.FETCH_MORE : NetworkStates.FETCH
      )
    );

    fetcher(
      "/api/media?" +
        query_builder({ ...state.images.filter }, !refetch && state.images.next)
    ).then((data) => {
      dispatch(PUT_DATA({ ...data, refetch }));
    });
  };
  store.dispatch(fn);
};

const ImageService = {
  create,
  delete: deleteImage,
  fetch,
};

export default ImageService;
