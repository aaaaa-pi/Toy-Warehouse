import { Form, Row, Col, Input, Space, Button } from "antd";
import { Link } from "react-router-dom";
import { FormEvent, useRef } from "react";
import CreatableReactSelect from "react-select/creatable";
import type { InputRef } from "antd";
import NoteData = Note.NoteData;

const { TextArea } = Input;

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export const NoteForm: React.FC<NoteFormProps> = ({ onSubmit }) => {
  const titleRef = useRef<InputRef>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.input!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
  }
  return (
    <>
      <Form layout="vertical">
        <Row>
          <Space size="large">
            <Col>
              <Form.Item name="title" label="标题">
                <Input size="large" ref={titleRef} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="tags" label="标签">
                <CreatableReactSelect isMulti className="width w-72 h-10" />
              </Form.Item>
            </Col>
          </Space>
        </Row>
        <Form.Item name="markdown" label="内容">
          <TextArea rows={15} ref={markdownRef}></TextArea>
        </Form.Item>
        <Space className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          {/* 点击Cancel返回上一页 */}
          <Link to="..">
            <Button htmlType="button" size="large">
              Cancel
            </Button>
          </Link>
        </Space>
      </Form>
    </>
  );
};
