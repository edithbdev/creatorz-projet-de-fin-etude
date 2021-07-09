import React from 'react';
import PropTypes from 'prop-types';
import Field from 'src/components/LoginForm/Field';
import { useHistory } from 'react-router-dom';

import '../style.scss';

const CreatorForm = ({
  firstname,
  lastname,
  pseudo,
  email,
  password,
  phone,
  brand,
  facebook,
  twitter,
  instagram,
  pinterest,
  linkedin,
  website,
  categoryId,
  categoriesList,
  description,
  changeField,
  handleInscriptionCreator,
  logged,
  handleUpdateCreator,
}) => {
  const history = useHistory();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (logged) {
      handleUpdateCreator();
      history.push('/profil');
    }
    else {
      handleInscriptionCreator();
      history.push('/');
    }
  };
  const handleChangeSelect = (evt) => {
    changeField(evt.target.value, 'categoryId');
  };
  const handleChangeTextarea = (evt) => {
    changeField(evt.target.value, 'description');
  };
  const handleChangeAvatar = (evt) => {
    changeField(evt.target.files[0], 'avatar');
  };
  const handleChangePictures = (evt) => {
    changeField(evt.target.files[0], 'picture1');
    if (evt.target.files[1] !== undefined) {
      changeField(evt.target.files[1], 'picture2');
    }
    if (evt.target.files[2] !== undefined) {
      changeField(evt.target.files[2], 'picture3');
    }
  };

  let messageRequired = true;
  if (logged) {
    messageRequired = false;
  }
  return (
    <section className="inscription">
      <form className="inscription-form" onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <Field
          name="firstname"
          placeholder="Prénom"
          onChange={changeField}
          value={firstname}
          required="required"
        />
        <Field
          name="lastname"
          placeholder="Nom"
          onChange={changeField}
          value={lastname}
          required="required"
        />
        <Field
          name="pseudo"
          placeholder="Pseudo"
          onChange={changeField}
          value={pseudo}
          required="required"
        />
        <Field
          name="email"
          type="email"
          placeholder="Adresse Email"
          onChange={changeField}
          value={email}
          required="required"
        />
        <Field
          name="phone"
          placeholder="Télephone"
          onChange={changeField}
          value={phone}
        />
        <Field
          name="brand"
          placeholder="Nom de la marque"
          onChange={changeField}
          value={brand}
          required="required"
        />
        <Field
          name="facebook"
          placeholder="Lien facebook"
          onChange={changeField}
          value={facebook}
        />
        <Field
          name="twitter"
          placeholder="Lien twitter"
          onChange={changeField}
          value={twitter}
        />
        <Field
          name="instagram"
          placeholder="Lien instagram"
          onChange={changeField}
          value={instagram}
        />
        <Field
          name="pinterest"
          placeholder="Lien pinterest"
          onChange={changeField}
          value={pinterest}
        />
        <Field
          name="linkedin"
          placeholder="Lien linkedin"
          onChange={changeField}
          value={linkedin}
        />
        <Field
          name="website"
          placeholder="Lien de votre site"
          onChange={changeField}
          value={website}
        />
        <select onChange={handleChangeSelect} value={categoryId} className="select" required>
          <option value="">Choisir une catégorie</option>
          {categoriesList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.category_name}
            </option>
          ))}
        </select>
        <textarea className="textarea" value={description} onChange={handleChangeTextarea} placeholder="Décrivez votre activité ici" required />
        <label htmlFor="avatar">Choisissez l'avatar
          <input id="avatar" type="file" accept=".png, .jpg, .jpeg" onChange={handleChangeAvatar} />
        </label>
        <label htmlFor="pictures">Choisissez 3 photos
          <input id="pictures" type="file" multiple accept=".png, .jpg, .jpeg" onChange={handleChangePictures} required={messageRequired} />
        </label>
        <p>
          Pour enregistrer plusieurs images, il suffit de maintenir enfoncé la
          touche 'Ctrl' (Contrôle) puis de sélectionner les photos
        </p>
        <Field
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={changeField}
          value={password}
          required="required"
        />
        <button
          type="submit"
          className="inscription-button"
        >
          Valider
        </button>
      </form>
    </section>
  );
};

CreatorForm.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string,
  phone: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  pinterest: PropTypes.string,
  linkedin: PropTypes.string,
  website: PropTypes.string,
  categoryId: PropTypes.string,
  categoriesList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    category_name: PropTypes.string.isRequired,
  })).isRequired,
  description: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleInscriptionCreator: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  handleUpdateCreator: PropTypes.func.isRequired,
};

CreatorForm.defaultProps = {
  password: '',
  facebook: '',
  twitter: '',
  instagram: '',
  pinterest: '',
  linkedin: '',
  website: '',
  categoryId: '',
};

export default CreatorForm;
