import styled from "styled-components";

const Wrapper = styled.div`
    text-align: center;
`

const Title = styled.h1`
   color: #fff;
  
`

const Home = () => {
    return <Wrapper>
        <Title>Welcome to Market Place!</Title>
        <p>On the Products tab, you can view the list of products sort and filter, and optionally add your product to the table. Please Enjoy!</p>
    </Wrapper>
}

export default Home