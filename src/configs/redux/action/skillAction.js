import api from '../../api';

export const getSkills = () => (dispatch) => {
  api.get('/skills')
    .then((res) => {
      const skills = res.data.data;
      dispatch({ type: 'GET_SKILLS', payload: skills });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const addSkill = (skill) => (dispatch) => {
  api.post(`/skills`, { skill_name: skill })
    .then((res) => {
      dispatch({ type: 'ADD_SKILL', payload: res.data });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const deleteSkill = (id) => (dispatch) => {
  api.delete(`/skills/${id}`)
    .then(() => {
      dispatch({ type: 'DELETE_SKILL', payload: id });
    })
    .catch((err) => {
      console.log(err.response);
    });
};
