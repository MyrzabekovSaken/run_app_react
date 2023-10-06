import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "@/styles/Home.css";
import { GeoAlt, Envelope, Phone, Instagram, Facebook, Youtube, Twitter} from "react-bootstrap-icons";


const Home = () => {
  return (
    <>
      {/* First section */}
      <section className="first-section">
        <div className="first-section-div">
          <Container fluid>
            <Row>
              <Col>
                <h2 className="second-heading">
                  <p>ШКОЛА</p>
                  <p>БЕГА</p>
                  <p>GORUNNERS</p>
                </h2>
                <h1 className="big-heading">
                  <p>ПОДДЕРЖКА</p>
                  <p>БЕГУНОВ В</p>
                  <p>ДОСТИЖЕНИИ</p>
                  <p>ИХ ЦЕЛЕЙ</p>
                </h1>
              </Col>
              <Col>
                <Button
                  href="login"
                  variant="primary"
                  className="log-in-button"
                  type="button"
                >
                  ЛИЧНЫЙ КАБИНЕТ
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Second section */}
      <section className="second-section">
        <div>
          <Container fluid>
            <Row>
              <Col>
                <div>
                  <h1 className="third-heading">НАША МИССИЯ</h1>
                  <h2 className="fourth-heading">
                    <p>Мы заботимся о своих атлетах и</p>
                    <p>постоянно работаем над поддержанием</p>
                    <p>корпоративного духа в команде,</p>
                    <p>создаем все условия для</p>
                    <p>комфортных тренировок</p>
                    <p>и сопровождаем команду на стартах.</p>
                  </h2>
                </div>
              </Col>
              <Col className="second-section-img"></Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Third section */}
      <section className="third-section">
        <div>
          <Container fluid>
            <Row>
              <Col>
                <h1 className="fifth-heading">ПОЛЬЗА БЕГА</h1>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={6}>
                <div className="third-section-square-div">
                  <ul className="third-section-ul">
                    <li>
                      <p>Улучшается работа сердечно-сосудистой системы</p>
                    </li>
                    <li>
                      <p>Ускоряется процесс мышления</p>
                    </li>
                    <li>
                      <p>Укрепляется иммунитет</p>
                    </li>
                  </ul>
                </div>
                <div className="third-section-round-img-first"></div>
              </Col>
              <Col lg={4} md={6}>
                <div className="third-section-square-div">
                  <ul className="third-section-ul">
                    <li>
                      <p>Укрепляются мышцы</p>
                    </li>
                    <li>
                      <p>Улучшается подвижность суставов</p>
                    </li>
                    <li>
                      <p>Повышается выносливость</p>
                    </li>
                  </ul>
                </div>
                <div className="third-section-round-img-second"></div>
              </Col>
              <Col lg={4} md={12}>
                <div className="third-section-square-div">
                  <ul className="third-section-ul">
                    <li>
                      <p>Замедляется процесс старения</p>
                    </li>
                    <li>
                      <p>Стабилизируется вес</p>
                    </li>
                    <li>
                      <p>Избавление от депрессии</p>
                    </li>
                  </ul>
                </div>
                <div className="third-section-round-img-third"></div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Fourth section */}
      <section className="fourth-section">
        <div>
          <Container fluid>
            <Row>
              <Col className="fourth-section-img"></Col>
              <Col>
                <Row>
                  <Col>
                    <h1 className="sixth-heading">КОНТАКТЫ</h1>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <div className="fourth-section-icon">
                      <GeoAlt size={50} />
                    </div>
                    <div className="fourth-section-icon">
                      <Envelope size={50} />
                    </div>
                    <div className="fourth-section-icon">
                      <Phone size={50} />
                    </div>
                  </Col>

                  <Col>
                    <div className="fourth-section-heading">
                      <h4>ЛОКАЦИЯ</h4>
                      <h5>Стадион</h5>
                    </div>

                    <div className="fourth-section-heading">
                      <h4>ЭЛЕКТРОННАЯ ПОЧТА</h4>
                      <h5>info@gorunners.kz</h5>
                    </div>

                    <div className="fourth-section-heading">
                      <h4>ТЕЛЕФОН</h4>
                      <h5>8 (123) 456-78-90</h5>
                    </div>
                  </Col>
                </Row>

                <div className="footer-div">
                  <a href="#" className="footer-logo">
                    <Instagram color="black" size={25} />
                  </a>
                  <a href="#" className="footer-logo">
                    <Facebook color="black" size={25} />
                  </a>
                  <a href="#" className="footer-logo">
                    <Youtube color="black" size={25} />
                  </a>
                  <a href="#" className="footer-logo">
                    <Twitter color="black" size={25} />
                  </a>

                  <p className="footer-text">© GoRunners 2023</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
};

export default Home;
