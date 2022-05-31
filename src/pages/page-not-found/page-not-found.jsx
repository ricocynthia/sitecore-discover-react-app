import { Container, Toolbar } from "@material-ui/core";

const PageNotFound = () => {
    return (
    <Container>
        <Toolbar/>
        <div> page not found. try going back to <a href="/">home page </a></div>
    </Container>)
}

export default PageNotFound;