import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "services/cryptoNewsApi";
import { useGetCryptosQuery } from "services/cryptoApi";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = "https://cdn-icons-png.flaticon.com/512/4843/4843056.png";
export default function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  console.log("🚀 ~ file: News.jsx ~ line 13 ~ News ~ data", data);

  const { data: CryptoNews } = useGetCryptoNewsQuery({
    newsCategory: [newsCategory],
    count: simplified ? 6 : 18,
  });
  console.log(CryptoNews);

  if (!CryptoNews?.value) return <Loader />;

  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              // @ts-ignore
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins?.map((currency) => (
                <Option value={currency.name} key={currency.uuid}>
                  {currency.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}

        {CryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="News"
                    className="crypto-news-image"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>

                  <Text>
                    {moment(news.datePublished)
                      .startOf(
                        // @ts-ignore
                        "ss"
                      )
                      .fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
