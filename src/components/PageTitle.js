import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => (
  <Helmet>
    <title>{`${title} | Vamogram`}</title>
  </Helmet>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
