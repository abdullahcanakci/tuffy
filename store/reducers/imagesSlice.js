const { createSlice } = require("@reduxjs/toolkit");
const { NetworkStates } = require("store/states");

const initialState = {
  data: {},
  imagesList: [],
  filter: {},
  next: null,
  status: NetworkStates.IDLE,
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    RESET_STATE: (state, action) => {
      state = initialState;
    },
    SET_STATE: (state, action) => {
      state.status = action.payload;
    },
    PUT_DATA: (state, action) => {
      const { data, meta, refetch } = action.payload;
      if (refetch) {
        state.data = {};
        state.imagesList = [];
      }
      state.next = meta.next;
      data.forEach((element) => {
        state.data[element.id] = element;
        state.imagesList.push(element.id);
      });
      state.status = NetworkStates.COMPLETE;
    },
    UPSERT: (state, action) => {
      const { image } = action.payload;
      console.log("upsert", image);
      console.log(state.data);
      if (!state.data[image.id]) {
        state.imagesList.unshift(image.id);
      }
      state.data[image.id] = image;
    },
    DELETE: (state, action) => {
      const { id } = action.payload;
      state.imagesList = state.imagesList.filter((x) => x != id);
      delete state.data[id];
    },
  },
});

export const { RESET_STATE, SET_STATE, PUT_DATA, UPSERT, DELETE } =
  imagesSlice.actions;

export default imagesSlice.reducer;

const imagesList = (state) => {
  return state.images.imagesList.map((id) => state.images.data[id]);
};

export { imagesList };
