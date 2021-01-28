import createDataContext from "./createDataContext";
import jsonServer from "../api/services";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "get_blogposts_less":
      return action.payload;
    case "get_blogposts_greater":
      return action.payload;
    case "get_categories":
      return action.payload;
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 999999),
          name: action.payload.title,
          product: action.payload.content,
          category: action.payload.content,
          expiry: action.payload.content,
          photo: "https://randomuser.me/api/portraits/women/44.jpg",
          notifications: notifications,
        },
      ];
    default:
      return state;
  }
};

/*const addBlogPost = (dispatch) => {
  return async (name, product, category, expiry, photo, callback) => {
    await jsonServer.post("/expires", {
      name,
      product,
      category,
      expiry,
      photo,
    });
    /*dispatch({ type: "add_blogpost", payload: { title, content } });*/
//   if (callback) {
//     callback();
//   }
// };
/*return async (title, content, callback) => {
    try {
      await axios.post("alskdjf", title, content);
      dispatch({ type: "add_blogpost", payload: { title, content } });
      callback();
    }catch(e){
        
    }
  };*/
//};

const addBlogPost = (dispatch) => async (
  name,
  product,
  category,
  expiry,
  photo,
  notifications
) => {
  console.log(name);
  console.log(product);
  console.log(expiry);
  console.log(photo);
  // make a request to our api
  await jsonServer.post("/expires", {
    name,
    product,
    category,
    expiry,
    photo,
    notifications,
  });
  //navigate("Home");
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/expires/days");
    console.log(response.data);
    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const getBlogPostsLess = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/expires/less");
    console.log(response.data);
    dispatch({ type: "get_blogposts_less", payload: response.data });
  };
};

const getBlogPostsGreater = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/expires/greater");
    console.log(response.data);
    dispatch({ type: "get_blogposts_greater", payload: response.data });
  };
};

const getCategories = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/categories");
    console.log(response.data);
    dispatch({ type: "get_categories", payload: response.data });
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    console.log(id);
    await jsonServer.delete(`/delete_expire/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (
    id,
    name,
    product,
    category,
    expiry,
    notifications,
    callback
  ) => {
    await jsonServer.put(`/update_expire/${id}`, {
      name,
      product,
      category,
      expiry,
      notifications,
    });
    // console.log(name);
    // console.log(product);
    // console.log(expiry);
    // console.log(photo);

    dispatch({
      type: "edit_blogpost",
      payload: { id, name, product, category, expiry, notifications },
    });
    if (callback) {
      console.log("Edit Submitted");
      callback();
      navigate("Home");
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    getCategories,
    deleteBlogPost,
    editBlogPost,
    getBlogPosts,
    getBlogPostsLess,
    getBlogPostsGreater,
  },
  []
);
