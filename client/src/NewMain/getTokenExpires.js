import Cookie from "js-cookie";

export const getProfileFetch = () => {
    return dispatch => {
      const token = Cookie.get("token") ? Cookie.get("token") : null;
      if (token) {
        return fetch("http://localhost:8000/Area25", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',//if read only
                'Authorization': 'Bearer ' + this.token //if write, need authorization
          }
        })
          .then(resp => resp.json())
          .then(data => {
            if (data.message) {
              // An error will occur if the token is invalid.
              // If this happens, you may want to remove the invalid token.
              Cookie.set("token", null);
            } 
          })
      }
    }
  }