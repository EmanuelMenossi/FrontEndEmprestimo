import { Button, Table, Form, Container, Row, Col} from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";
import { useState } from "react";
export default function TabelaEmprestimo(props) {

  const [termoDeBusca, setTermoDeBusca] = useState('');

  const buscaEmprestimo = () => {
    if(termoDeBusca.length === 0){
      props.buscar()
    }else{
      const url = (`${urlBase}/emprestimo/buscar/${termoDeBusca}`)
      fetch(url)
      .then((response) => response.json())
      .then((data) => props.setEmprestimo(data))
      .catch((error) => console.error('Erro ao buscar os dados:', error));
    }
  };

  return (
    <body id="corpo" className="colorwhite">
      <Container className="border corpoTabela">
        <h2 className="text-center m-4">Tabela de Emprestimos</h2>
        <Button
          variant="success"
          onClick={() => {
            props.exibirTabela(false);
            props.setModoEdicao(false)
          }}
        >
          Cadastrar
        </Button>
        <Row>
          <Col className=" justify-content-end md-2">
          <Form className="d-flex mb-2 mt-2">
            <Form.Control
              type="text"
              value={termoDeBusca}
              onChange={(e) => setTermoDeBusca(e.target.value)}
              placeholder="Pesquisar o empréstimo"
            />
            <Button className="BotaoPesquisar" type="button" onClick={buscaEmprestimo}>Pesquisar</Button>
          </Form>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead className="colorWhite">
            <tr>
              <th>Código Empréstimo</th>
              <th>Titulo de Exemplar</th>
              <th>Data de Retirada</th>
              <th>Data de Devolução</th>
              <th>Status de Empréstimo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {props.listaEmprestimos?.map((emprestimo, i) => {
              let statusClasse = '';
                
              if (emprestimo.statusEmprest === 0) {
                statusClasse = 'red-text';
              } else if (emprestimo.statusEmprest === 1) {
                statusClasse = 'green-tex';
              } else {
                statusClasse = '';
              }
              return (
                <tr key={i}>
                  <td id="colorwhite">{emprestimo.codEmprestimo}</td>
                  <td id="colorwhite">{emprestimo.tituloExemplar}</td>
                  <td id="colorwhite">{emprestimo.dataRetirada}</td>
                  <td id="colorwhite">{emprestimo.dataDevolucao}</td>
                  <td id={statusClasse} >{emprestimo.statusEmprest === 0 ? 'indisponível' : emprestimo.statusEmprest === 1 ? 'disponível' : 'Outro Valor'}</td>
                  <td>
                    <Button variant="warning" onClick={() => { props.editarEmprestimo(emprestimo)}}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                      </svg>
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (
                          window.confirm("Deseja realmente excluir o Emprestimo?")
                        ) {
                          props.excluirEmprestimo(emprestimo);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </body>
  );
}
