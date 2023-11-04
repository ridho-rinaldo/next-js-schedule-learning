import { ProfileTwoTone, AccountBookTwoTone, CalendarTwoTone, EditTwoTone, EllipsisOutlined, FileZipTwoTone, PrinterTwoTone, RestTwoTone, SaveTwoTone } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Menu,
  Message,
  Row,
  Timeline
} from 'antd';
import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis
} from 'react-vis';

import NoSSR from 'react-no-ssr';
import PostCard from './shared/PostCard';
import StatCard from './shared/StatCard';
import styled from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { DummyListClass } from '../network/mockup/class';
import { DummyListSubject } from '../network/mockup/subject';
import { DummyListClassSchedule } from '../network/mockup/class-schedule';

const { MonthPicker } = DatePicker;

const axes = Array.from(Array(12).keys());

const generate = () => {
  let arr = [];
  axes.map(x => {
    const y = Math.floor(Math.random() * 10) + 1;
    arr.push({ x, y });
  });
  return arr;
};

const series = [
  {
    title: 'Views',
    data: generate()
  },
  {
    title: 'Sales',
    data: generate()
  }
];

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  .rv-discrete-color-legend {
    display: inline-block;
    width: auto !important;
  }
  .rv-discrete-color-legend-item {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <FileZipTwoTone style={{ fontSize: '16px' }} />
        <span className="mx-3">Archive</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <EditTwoTone style={{ fontSize: '16px' }} />
        <span className="mx-3">Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <RestTwoTone style={{ fontSize: '16px' }} />
        <span className="mx-3">Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <SaveTwoTone style={{ fontSize: '16px' }} />
        <span className="mx-3">Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <PrinterTwoTone style={{ fontSize: '16px' }} />
        <span className="mx-3">Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const TimelinePeriod = ({ content }) => (
  <small
    className="text-muted"
    css={`
      display: block;
    `}
  >
    {content}
  </small>
);

const Overview = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Teachers"
            value={DummyListClass.data.length}
            icon={<ProfileTwoTone style={{ fontSize: '20px'}} />}
            color={theme.primaryColor}
            clickHandler={() => Message.info('Campaign stat button clicked')}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Subjects"
            value={DummyListSubject.data.length}
            icon={<AccountBookTwoTone style={{ fontSize: '20px'}}  />}
            color={theme.darkColor}
            clickHandler={() => Message.info('Customers stat button clicked')}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Class"
            value={DummyListClass.data.length}
            icon={<CalendarTwoTone style={{ fontSize: '20px'}} />}
            color={theme.warningColor}
            clickHandler={() => Message.info('Queries stat button clicked')}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Class Schedule"
            value={DummyListClassSchedule.data.length}
            icon={<CalendarTwoTone style={{ fontSize: '20px'}} />}
            color={theme.errorColor}
            clickHandler={() => Message.info('Opens stat button clicked')}
          />
        </Col>
      </Row>

      <Card
        title="Sales analytics"
        extra={
          <Dropdown overlay={menu}>
            <EllipsisOutlined style={{ fontSize: '20px' }} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"
      >
        <NoSSR>
          <Legend>
            <DiscreteColorLegend width={180} height={20} items={series} />
            <MonthPicker placeholder="Select a month" />
          </Legend>
          <FlexibleWidthXYPlot xType="ordinal" height={340} xDistance={100}>
            <VerticalGridLines style={{ strokeWidth: 0.5 }} />
            <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
            <XAxis style={{ strokeWidth: 0.5 }} />
            <YAxis style={{ strokeWidth: 0.5 }} />
            <VerticalBarSeries color="#007bff" data={series[0].data} />
            <VerticalBarSeries
              color="rgb(211, 232, 255)"
              data={series[1].data}
            />
          </FlexibleWidthXYPlot>
        </NoSSR>
      </Card>

      <Row gutter={16}>
        <Col sm={24} md={8} style={{ display:'grid' }}>
          <Card
            title="Activity"
            extra={
              <Dropdown overlay={menu}>
                <EllipsisOutlined style={{ fontSize: '20px' }} />
              </Dropdown>
            }
          >
            <Timeline
              pending={<div className="ml-4">Activities pending...</div>}
              className="mt-2"
            >
              <Timeline.Item
                dot={<Avatar size={24} src="/images/face1.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="9.45" />
                  <span>
                    <a>John Doe</a> Created a new class
                  </span>
                </div>
              </Timeline.Item>
              <Timeline.Item
                dot={<Avatar size={24} src="/images/face2.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="11.20" />
                  <span>
                    <a>Paula Bean</a> Canceled Statistics class
                  </span>
                </div>
              </Timeline.Item>
              <Timeline.Item
                dot={<Avatar size={24} src="/images/face3.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="13.00" />
                  <span>
                    <a>Peter Hadji</a> Joined to be teacher
                  </span>
                </div>
              </Timeline.Item>
              <Timeline.Item
                dot={<Avatar size={24} src="/images/face4.jpg" />}
              >
                <div className="ml-4 text-truncate">
                  <TimelinePeriod content="15.00" />
                  <span>
                    <a>Trevor Belmont</a> Created a new subject
                  </span>
                </div>
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
        <Col md={24} lg={16}>
          <PostCard
            title="Title: The Impact of Online Learning Applications"
            subtitle="John Doe"
            image="/images/unsplash/13.jpg"
            images={[
              '/images/unsplash/13.jpg',
              '/images/unsplash/22.jpg'
            ]}
            imageHeight={365}
            text="In recent years, online learning applications have emerged as powerful tools for education. These platforms have revolutionized the way we acquire knowledge, making learning more accessible and convenient than ever before. In this article, we will explore the significance of online learning applications and their role in the modern educational landscape."
          />
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
