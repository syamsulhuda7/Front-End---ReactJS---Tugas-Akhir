import styled, { keyframes } from 'styled-components';

// Keyframe untuk animasi fade in
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

// Keyframe untuk animasi fade out
const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
        top: 0;
    }
`;

// Styled component untuk komponen Notification
const NotificationWrapper = styled.div`
    z-index: 3;
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #29d916;
    color: white;
    padding: 15px;
    border-radius: 5px;
    animation: ${fadeIn} 0.3s ease-in-out, ${fadeOut} 1s ease-in-out 1.5s; /* Terapkan animasi fade in dan fade out */
`;

const Notification = () => {
    return (
        <NotificationWrapper>
            <p>Product has been added successfully</p>
        </NotificationWrapper>
    );
};

export default Notification;
