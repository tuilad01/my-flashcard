import FormGroup from "../components/form-group/form-group";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function GroupPage() {
    const {  groupId } = useParams();
    
    if (groupId) {
        return ( 
            <Container>
                <FormGroup id={groupId}></FormGroup>
            </Container>
         );
    } else {
        return ( 
            <Container>
                <FormGroup></FormGroup>
            </Container>
         );
    }
}

export default GroupPage;