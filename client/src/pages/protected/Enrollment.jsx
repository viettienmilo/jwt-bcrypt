import { redirect } from "react-router";
import Container from "../../components/Container";
import Card from "../../components/Card";

export function loader(isAuthed) {
    if (!isAuthed) {
        throw redirect('/user/login');
    }
    return null;
}

const Enrollment = () => {
    return (
        <Container>
            <Card>
                <h1>Enrollment</h1>
            </Card>
        </Container>
    )

}

export default Enrollment