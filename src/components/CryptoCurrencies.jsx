import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Row, Col, Card, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("API data", cryptos);

  useEffect(() => {
    const filterData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filterData);
  }, [cryptosList, searchTerm]);
  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Crypto Currency "
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                style={{ borderBottom: `5px solid ${currency.color}` }}
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt={currency.iconUrl}
                  />
                }
                hoverable
              >
                <p
                  className="crypto-price"
                  style={{ backgroundColor: `${currency.color}` }}
                >
                  Price: <span>{millify(currency.price)}</span>
                </p>
                <p className="crypto-marketcap">
                  Market Cap: <span>{millify(currency.marketCap)}</span>
                </p>
                <p className="crypto-change">
                  Daily Change: <span>{millify(currency.change)}%</span>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
