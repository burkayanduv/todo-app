import linkStyle from '../componentStyles/linkStyle'
import containerStyle from '../componentStyles/containerStyle'
import formStyle from '../componentStyles/formStyle'


const loginRegisterStyle = {
    ...formStyle,
    styledTitle: {
        display:"flex", 
        alignItems: "center", 
        justifyContent: "center"
    },
    styledLink: {
        ...linkStyle.styledLink
    },
    container: {
        ...containerStyle.container
    },
    buttonWrapper: {
        marginTop: "40px",
        marginBottom: "50px"
    },
    buttonWrapperResponse: {
        marginTop: "40px",
        marginBottom: "30px"
    },
    responseSuccess:{
        marginTop: "18px",
        color: "#32CD32"
    },
    responseWarning:{
        marginTop: "18px",
        color: "#FF4500"
    }
}

export default loginRegisterStyle