/* eslint-disable dot-notation */
import axios from 'axios';
import {
  LOGIN,
  login,
  LOGOUT,
  logout,
  loginUser,
  FETCH_USER,
  fetchUser,
  saveUser,
  INSCRIPTION_CREATOR,
  INSCRIPTION_USER,
  UPDATE_USER_PROFILE,
  UPDATE_CREATOR_PROFILE,
  DELETE_PROFILE,
  ADD_COMMENT,
} from '../actions/user';
import {
  fetchCreators,
  FETCH_COMMENTS,
  FETCH_CREATORS,
  saveComments,
  saveCreators,
  fetchComments,
} from '../actions/creators';
import { fetchCategories, FETCH_CATEGORIES, saveCategories } from '../actions/categories';

const api = axios.create({
  baseURL: 'http://ec2-54-80-48-178.compute-1.amazonaws.com/api',
});
const ajax = (store) => (next) => (action) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  switch (action.type) {
    case FETCH_CREATORS:
      api.get('/users/creator')
        .then((response) => {
          // handle success
          store.dispatch(saveCreators(response.data));
          store.dispatch(fetchComments());
        })
        .catch(() => {
          // handle error
          alert('site indisponible');
        })
        .finally(() => {
          // always executed
        });
      break;
    case FETCH_CATEGORIES:
      api.get('/categories')
        .then((response) => {
          // handle success
          store.dispatch(saveCategories(response.data));
        })
        .catch(() => {
          // handle error
          alert('site indisponible');
        })
        .finally(() => {
          // always executed
        });
      break;
    case FETCH_COMMENTS:
      api.get('/comments')
        .then((response) => {
          // handle success
          store.dispatch(saveComments(response.data));
        })
        .catch(() => {
          // handle error
          alert('site indisponible');
        })
        .finally(() => {
          // always executed
        });
      break;
    case LOGIN: {
      // on peut faire du destructuring sur plusieurs niveaux
      // const { user: { email, password } } = store.getState();
      const state = store.getState();
      api.post('/login_check', {
        username: state.user.email,
        password: state.user.password,
      }, config)
        .then((response) => {
          // je modifie mon instance d'axios pour y mémoriser le token,
          // toutes mes futures requetes incluront l'entete Authorization avec le token
          // jusqu'à ce que j'oublie le token
          api.defaults.headers.common['Authorization'] = `bearer ${response.data.token}`;
          store.dispatch(loginUser());
          store.dispatch(fetchUser());
          store.dispatch(fetchCreators());
          store.dispatch(fetchCategories());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Mauvais identifiant/mot de passe');
        })
        .finally(() => {
          //
        });
      break;
    }
    case FETCH_USER:
      api.get('/users/current')
        .then((response) => {
          // handle success
          store.dispatch(saveUser(response.data));
        })
        .catch(() => {
          // handle error
        })
        .finally(() => {
          // always executed
        });
      break;
    case LOGOUT:
      // au logout on oublie le token
      // revient au meme que de passer la propriété à undefined
      delete api.defaults.headers.common.Authorization;
      break;
    case INSCRIPTION_USER:
    { const state = store.getState();
      const data = {
        pseudo: state.user.pseudo,
        email: state.user.email,
        password: state.user.password,
        roles: ['ROLE_USER'],
        category: 0,
      };
      const configPicture = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      api.post('/users', data, config)
        .then((response) => {
          if (state.user.avatar !== null) {
            const formDataPicture = new FormData();
            formDataPicture.append('avatar', state.user.avatar, state.user.avatar.name);
            api.post(`/users/${response.data.id}/upload-avatar`, formDataPicture, configPicture)
              .then(() => {
              })
              .catch(() => {
              });
          }
          store.dispatch(login());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Erreur');
        })
        .finally(() => {
          //
        });
      break;
    }
    case INSCRIPTION_CREATOR:
    { const state = store.getState();
      const data = {
        pseudo: state.user.pseudo,
        email: state.user.email,
        password: state.user.password,
        roles: ['ROLE_CREATOR', 'ROLE_USER'],
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        phone: state.user.phone,
        brand: state.user.brand,
        facebook: state.user.facebook,
        twitter: state.user.twitter,
        instagram: state.user.instagram,
        pinterest: state.user.pinterest,
        linkedin: state.user.linkedin,
        website: state.user.website,
        description: state.user.description,
        category: state.user.categoryId,
      };
      const configPicture = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      api.post('/users', data, config)
        .then((response) => {
          // upload de l'avatar
          if (state.user.avatar !== null) {
            const formDataAvatar = new FormData();
            formDataAvatar.append('avatar', state.user.avatar, state.user.avatar.name);
            api.post(`/users/${response.data.id}/upload-avatar`, formDataAvatar, configPicture)
              .then(() => {
              })
              .catch(() => {
              });
          }
          // upload de la 1er image
          const formDataPicture1 = new FormData();
          formDataPicture1.append('name', state.user.picture1, state.user.picture1.name);
          api.post(`/users/${response.data.id}/add-picture`, { name: state.user.picture1.name }, config)
            .then((responseAddPicture) => {
              api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture1, configPicture)
                .then(() => {
                })
                .catch(() => {
                });
            })
            .catch(() => {
            });
          // upload de la 2eme image
          if (state.user.picture2 !== null) {
            const formDataPicture2 = new FormData();
            formDataPicture2.append('name', state.user.picture2, state.user.picture2.name);
            api.post(`/users/${response.data.id}/add-picture`, { name: state.user.picture2.name }, config)
              .then((responseAddPicture) => {
                api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture2, configPicture)
                  .then(() => {
                  })
                  .catch(() => {
                  });
              })
              .catch(() => {
              });
          }
          // upload de la 3eme image
          if (state.user.picture3 !== null) {
            const formDataPicture3 = new FormData();
            formDataPicture3.append('name', state.user.picture3, state.user.picture3.name);
            api.post(`/users/${response.data.id}/add-picture`, { name: state.user.picture3.name }, config)
              .then((responseAddPicture) => {
                api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture3, configPicture)
                  .then(() => {
                  })
                  .catch(() => {
                  });
              })
              .catch(() => {
              });
          }
          store.dispatch(login());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Erreur');
        })
        .finally(() => {
          //
        });
      break;
    }
    case UPDATE_USER_PROFILE:
    { const state = store.getState();
      const data = {
        pseudo: state.user.pseudo,
        email: state.user.email,
        password: state.user.password,
      };
      const configPicture = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      api.put(`/users/${state.user.currentUser.id}`, data, config)
        .then((response) => {
          if (state.user.avatar !== null) {
            const formDataAvatar = new FormData();
            formDataAvatar.append('avatar', state.user.avatar, state.user.avatar.name);
            api.post(`/users/${response.data.id}/upload-avatar`, formDataAvatar, configPicture)
              .then(() => {
                store.dispatch(fetchUser());
              })
              .catch(() => {
              });
          }
          store.dispatch(fetchUser());
          store.dispatch(fetchCreators());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Erreur');
        })
        .finally(() => {
          //
        });
      break;
    }
    case UPDATE_CREATOR_PROFILE:
    { const state = store.getState();
      const data = {
        pseudo: state.user.pseudo,
        email: state.user.email,
        password: state.user.password,
        firstname: state.user.firstname,
        lastname: state.user.lastname,
        phone: state.user.phone,
        brand: state.user.brand,
        facebook: state.user.facebook,
        twitter: state.user.twitter,
        instagram: state.user.instagram,
        pinterest: state.user.pinterest,
        linkedin: state.user.linkedin,
        website: state.user.website,
        description: state.user.description,
        category: state.user.categoryId,
      };
      const configPicture = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      api.put(`/users/${state.user.currentUser.id}`, data, config)
        .then((response) => {
          if (state.user.avatar !== null) {
            const formDataAvatar = new FormData();
            formDataAvatar.append('avatar', state.user.avatar, state.user.avatar.name);
            api.post(`/users/${response.data.id}/upload-avatar`, formDataAvatar, configPicture)
              .then(() => {
                store.dispatch(fetchUser());
                store.dispatch(fetchCreators());
                store.dispatch(fetchCategories());
              })
              .catch(() => {
              });
          }
          // upload de la 1er image en modification
          if (state.user.picture1 !== null) {
            const formDataPicture1 = new FormData();
            formDataPicture1.append('name', state.user.picture1, state.user.picture1.name);
            api.put(`/picture/${response.data.pictures[0].id}`, { name: state.user.picture1.name }, config)
              .then((responseAddPicture) => {
                api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture1, configPicture)
                  .then(() => {
                    store.dispatch(fetchUser());
                    store.dispatch(fetchCreators());
                    store.dispatch(fetchCategories());
                  })
                  .catch(() => {
                  });
              })
              .catch(() => {
              });
          }
          // upload de la 2eme image en modification
          if (state.user.picture2 !== null) {
            const formDataPicture2 = new FormData();
            formDataPicture2.append('name', state.user.picture2, state.user.picture2.name);
            if (response.data.pictures[1]) {
              api.put(`/picture/${response.data.pictures[1].id}`, { name: state.user.picture1.name }, config)
                .then((responseAddPicture) => {
                  api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture2, configPicture)
                    .then(() => {
                      store.dispatch(fetchUser());
                      store.dispatch(fetchCreators());
                      store.dispatch(fetchCategories());
                    })
                    .catch(() => {
                    });
                })
                .catch(() => {
                });
            }
            else {
              api.post(`/users/${response.data.id}/add-picture`, { name: state.user.picture2.name }, config)
                .then((responseAddPicture) => {
                  api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture2, configPicture)
                    .then(() => {
                    })
                    .catch(() => {
                    });
                })
                .catch(() => {
                });
            }
          }
          // upload de la 3eme image en modification
          if (state.user.picture3 !== null) {
            const formDataPicture3 = new FormData();
            formDataPicture3.append('name', state.user.picture3, state.user.picture3.name);
            if (response.data.pictures[2]) {
              api.put(`/picture/${response.data.pictures[2].id}`, { name: state.user.picture1.name }, config)
                .then((responseAddPicture) => {
                  api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture3, configPicture)
                    .then(() => {
                      store.dispatch(fetchUser());
                      store.dispatch(fetchCreators());
                      store.dispatch(fetchCategories());
                    })
                    .catch(() => {
                    });
                })
                .catch(() => {
                });
            }
            else {
              api.post(`/users/${response.data.id}/add-picture`, { name: state.user.picture3.name }, config)
                .then((responseAddPicture) => {
                  api.post(`/picture/${responseAddPicture.data.id}/upload-picture`, formDataPicture3, configPicture)
                    .then(() => {
                    })
                    .catch(() => {
                    });
                })
                .catch(() => {
                });
            }
          }
          store.dispatch(fetchUser());
          store.dispatch(fetchCreators());
          store.dispatch(fetchCategories());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Erreur');
        })
        .finally(() => {
          //
        });
      break;
    }
    case DELETE_PROFILE: {
      const state = store.getState();
      api.delete(`/users/${state.user.currentUser.id}`, config)
        .then(() => {
          store.dispatch(logout());
          store.dispatch(fetchCreators());
          store.dispatch(fetchCategories());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Erreur lors de la suppression de compte');
        })
        .finally(() => {
          //
        });
      break;
    }
    case ADD_COMMENT: {
      const state = store.getState();
      api.post('/comments', {
        user: state.user.currentUser.id,
        body: state.user.commentBody,
        userReceived: state.user.currentCreatorId,
      }, config)
        .then(() => {
          store.dispatch(fetchCreators());
          store.dispatch(fetchCategories());
        })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
          alert('Erreur lors de l\'envoi du commentaire');
        })
        .finally(() => {
          //
        });
      break;
    }
    default:
  }
  next(action);
};
export default ajax;
