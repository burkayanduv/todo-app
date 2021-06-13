import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'


const Button = ({ color, icon, onClick }) => {
    return (
        <IconButton onClick={onClick} color={color}>{icon}</IconButton>
    )
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes= {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button

