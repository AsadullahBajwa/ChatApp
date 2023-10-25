import styled from "styled-components"

export const StyledButton = styled.button`
   cursor: pointer;
  background: #aa0000;
  color: #f9f9f9;
  border: 0;
  font-weight: 600;
  letter-spacing: 2px;
  /* color: ${(props) => props.$variant === 'outline' ? '#4caf50' : '#fff'}; */

  &:hover {
    background: #810101;
  }
`

export const FormButton = styled(StyledButton)`
 width: 100%;
  height: 60px;
  outline: none;
  padding: 0;
  font-family: inherit;
  font-size: 16px;
  border-radius: 8px;`