import { Form, Input, DatePicker, Space, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "../styles/Home.module.css";
const { RangePicker } = DatePicker;

export default function Home() {
  const onFinish = (values: any) => {
    console.log("🐱 onFinish ~ values", values);
  };

  return (
    <div className={styles.container}>
      <h2>Create Event Outlook Calendar</h2>
      <Form
        name="from"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Event Name"
          name="subject"
        >
          <Input
            placeholder="Enter Event Name Here"
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Start Date - End Date"
          name="date"
        >
          <RangePicker allowClear />
        </Form.Item>
        <Form.List name="attendee">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                  >
                    <Input
                      placeholder="Enter Email Here"
                      type="email"
                      allowClear
                    />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Invite Attendee
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item wrapperCol={{ span: 6 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
