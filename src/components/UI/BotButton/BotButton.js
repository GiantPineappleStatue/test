import Button from 'react-bootstrap/Button';

const BotButton = ({ buttonText, styleclass, onClick, variant, icon, hasIcon, size }) => {
    return (
        <Button onClick={onClick} className={`${styleclass}`} variant={variant} size={size}>
            {hasIcon && <span>{icon !== '' && icon}</span>}
            {buttonText}
        </Button>
    );
};

export default BotButton;
