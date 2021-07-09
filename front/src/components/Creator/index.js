import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Page from 'src/components/Page';
import {
  Button,
  Image,
  List,
  Form,
  Header,
  Icon,
  Comment,
} from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PicturesCreator from './PicturesCreator';
import Comments from './Comments';

import './style.scss';

const Creator = ({
  creator,
  commentBody,
  changeField,
  logged,
  addComment,
  saveCurrentCreatorId,
  comments,
}) => {
  const history = useHistory();
  const handleChangeTextarea = (evt) => {
    changeField(evt.target.value, 'commentBody');
  };
  const handleSubmitComment = (evt) => {
    evt.preventDefault();
    if (logged) {
      saveCurrentCreatorId(creator.id);
      addComment();
      history.push(`/createur/${creator.slug}`);
    }
    else {
      history.push('/inscription');
    }
  };
  return (
    <Page>
      <section className="creator">
        {creator.pictures && (
          <Carousel autoPlay infiniteLoop showThumbs={false} dynamicHeight={false} className="carousel">
            {creator.pictures.map((picture) => (
              <PicturesCreator key={picture.id} {...picture} />
            ))}
          </Carousel>
        )}
        <div className="creator-info">
          <div className="creator-info-plus">
            <div className="creator-info-avatar">
              <Image src={`http://ec2-54-80-48-178.compute-1.amazonaws.com/images/${creator.avatar}`} alt="avatar" avatar fluid />
            </div>
            <p className="creator-info-name">{creator.firstname} {creator.lastname}</p>
            {creator.category && (
              <div className="creator-info-category">
                {creator.category.category_name}
              </div>
            )}
          </div>
          <List className="creator-info-list">
            <List.Item className="creator-info-brand">
              <List.Icon name="copyright outline" />
              <List.Content className="creator-info-brand">{creator.brand}</List.Content>
            </List.Item>
            <List.Item className="creator-info-desc">
              <List.Icon name="pencil" />
              <List.Content className="creator-info-desc">{creator.description}</List.Content>
            </List.Item>
            <List.Item className="creator-info-email">
              <List.Icon name="mail" />
              <List.Content className="creator-info-email">
                <a href={creator.email} target="_blank" rel="noreferrer">{creator.email}</a>
              </List.Content>
            </List.Item>
            <List.Item className="creator-info-phone">
              <List.Icon name="phone" />
              <List.Content className="creator-info-phone">{creator.phone}</List.Content>
            </List.Item>
            {creator.website && (
            <List.Item className="creator-info-website">
              <List.Icon name="linkify" />
              <List.Content className="creator-info-website">
                <a href={creator.website} target="_blank" rel="noreferrer">{creator.website}</a>
              </List.Content>
            </List.Item>
            )}
          </List>
          <div className="creator-info-social">
            {creator.facebook && (
            <Button secondary circular className="button" icon="facebook" href={creator.facebook} target="_blank" />
            )}
            {creator.twitter && (
            <Button secondary circular className="button" icon="twitter" href={creator.twitter} />
            )}
            {creator.linkedin && (
            <Button secondary circular className="button" icon="linkedin" href={creator.linkedin} />
            )}
            {creator.pinterest && (
            <Button secondary circular className="button" icon="pinterest" href={creator.pinterest} />
            )}
            {creator.instagram && (
            <Button secondary circular className="button" icon="instagram" href={creator.instagram} />
            )}
          </div>
        </div>
      </section>
      <section className="comments">
        <Comment.Group>
          <Header as="h3" dividing>
            Commentaires <Icon name="comment outline" />
          </Header>
          {comments.map((comment) => (
            <Comments key={comment.id} {...comment} />
          ))}
          <Form reply onSubmit={handleSubmitComment}>
            <Form.TextArea value={commentBody} onChange={handleChangeTextarea} placeholder={!logged ? 'Connectez vous pour écrire un commentaire' : 'Votre commentaire ici'} />
            <Button id="comment-button-send" content="Ajouter un commentaire" labelPosition="left" icon="paper plane" />
          </Form>
        </Comment.Group>
      </section>
    </Page>
  );
};

Creator.propTypes = {
  creator: PropTypes.shape({
    pictures: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })),
    id: PropTypes.string,
    slug: PropTypes.string,
    avatar: PropTypes.string,
    logo: PropTypes.string,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    category: PropTypes.shape({
      category_name: PropTypes.string.isRequired,
    }),
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    website: PropTypes.string,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    linkedin: PropTypes.string,
    pinterest: PropTypes.string,
    instagram: PropTypes.string,
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
  commentBody: PropTypes.string,
  changeField: PropTypes.func.isRequired,
  logged: PropTypes.bool.isRequired,
  addComment: PropTypes.func.isRequired,
  saveCurrentCreatorId: PropTypes.func.isRequired,
};

Creator.defaultProps = {
  creator: PropTypes.shape({
    website: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    pinterest: null,
    instagram: null,
    comments: null,
    pictures: null,
  }),
  commentBody: '',
  comments: null,
};

export default Creator;
