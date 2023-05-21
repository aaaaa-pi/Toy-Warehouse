import { Form, Row, Col, Input, Space, Button } from "antd";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/creatable";

export function NoteList() {
  return (
    <>
      <Row className="flex items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto" className="ml-auto">
          <Space size={8} direction="horizontal">
            <Link to="/new">
              <Button type="primary" htmlType="submit" size="large">
                新建笔记
              </Button>
            </Link>
            <Button size="large">编辑标签</Button>
          </Space>
        </Col>
      </Row>
      <Form layout="horizontal">
        <Form.Item name="title" label="标题">
          <Input size="large" />
        </Form.Item>

        <Form.Item name="tags" label="标签">
          <ReactSelect isMulti />
        </Form.Item>
      </Form>
    </>
  );
}
