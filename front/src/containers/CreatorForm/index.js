import { connect } from 'react-redux';
import CreatorForm from 'src/components/Inscription/InscriptionCreator/CreatorForm';
import { changeValue, inscriptionCreator, updateCreatorProfile } from 'src/actions/user';

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  firstname: state.user.firstname,
  lastname: state.user.lastname,
  pseudo: state.user.pseudo,
  phone: state.user.phone,
  brand: state.user.brand,
  facebook: state.user.facebook,
  twitter: state.user.twitter,
  instagram: state.user.instagram,
  pinterest: state.user.pinterest,
  linkedin: state.user.linkedin,
  website: state.user.website,
  categoriesList: state.category.categoryList,
  category: state.user.category,
  description: state.user.description,
  avatar: state.user.avatar,
  logo: state.user.logo,
  picture1: state.user.picture1,
  picture2: state.user.picture2,
  picture3: state.user.picture3,
  categoryId: state.user.categoryId,
  logged: state.user.logged,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (value, name) => {
    const action = changeValue(name, value);
    dispatch(action);
  },
  handleInscriptionCreator: () => {
    dispatch(inscriptionCreator());
  },
  handleUpdateCreator: () => {
    dispatch(updateCreatorProfile());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatorForm);
