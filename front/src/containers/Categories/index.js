import { connect } from 'react-redux';
import Categories from 'src/components/Categories';

const mapStateToProps = (state) => ({
  categoryList: state.category.categoryList,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
