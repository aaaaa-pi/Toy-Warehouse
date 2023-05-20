import { Form, Row, Col, Input, Space, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState } from "react";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import type { InputRef } from "antd";
import NoteData = Note.NoteData;
import Tag = Note.Tag;

const { TextArea } = Input;

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<InputRef>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.input!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    navigate(".."); // 提交表单后重定向
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
                <CreatableReactSelect
                  onCreateOption={(label) => {
                    const newTag = { id: uuidV4(), label };
                    onAddTag(newTag);
                    setSelectedTags((prev) => [...prev, newTag]);
                  }}
                  value={selectedTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onChange={(tags) => {
                    setSelectedTags(
                      tags.map((tag) => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                  className="width w-72 h-10"
                />
              </Form.Item>
            </Col>
          </Space>
        </Row>
        <Form.Item name="markdown" label="内容">
          <TextArea rows={15} ref={markdownRef}></TextArea>
        </Form.Item>
        <Space className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            onClick={handleSubmit}
          >
            Save
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
}
