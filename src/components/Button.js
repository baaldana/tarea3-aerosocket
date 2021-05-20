import PropTypes from 'prop-types';

const Button = ({ color, text, onClick }) => {


    return (
        <button onClick={onClick} style={{backgroundColor: color}} className='btn'>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
    text: 'Sample Text',
}

export default Button
