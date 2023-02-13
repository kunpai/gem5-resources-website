import { Container, Form, Button, InputGroup, FormControl } from "react-bootstrap";
import styles from '/styles/searchbox.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";

export default function Seachbox() {
    const router = useRouter()

    const [search, setSearch] = useState("");

    useEffect(() => {
        setSearch(new URLSearchParams(new URL(window.location.href).search).get('q'));
    }, []);

    function handleSubmit(e) {
        e.preventDefault()
        console.log(e.target[0].value)
        // check which button was clicked
        console.log(e.nativeEvent.submitter.innerText)
        // navigate to the /resources/q=... page
        router.push(`/resources?q=${e.target[0].value}`)
    }
    return (
        <>
            <Form className="w-100" onSubmit={handleSubmit}>
                <InputGroup>
                    <Form.Control type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <InputGroup.Text>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                            alt="Search Icon"
                            height="20"
                            width="20"
                        />
                    </InputGroup.Text>
                </InputGroup>
                <Container className={styles.buttonContainer}>
                    <Button variant="outline-primary" type="submit">Search</Button>
                    <Button variant="outline-primary" type="submit">Advanced Search</Button>
                </Container>
            </Form>
        </>
    )
}