import {
  Form,
  Input,
  DatePicker,
  Space,
  Button,
  Alert,
  notification,
  Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
require("./home.less");

import moment from "moment";
import axios from "axios";
import { useState } from "react";
import { AlertType } from "../config/event";
const { RangePicker } = DatePicker;

const URL = process.env.apiUrl || "";

export default function FormCreateEvent() {
  const [loading, setLoading] = useState<boolean>(false);

  const openNotification = (type: AlertType, data?: any) => {
    if (type === AlertType.Success) {
      notification.success({
        message: `Create Event Success`,
        description: (
          <>
            Click{" "}
            <a
              href={data.webLink}
              target="_blank"
              rel="noreferrer"
            >
              Here
            </a>{" "}
            to check your calendar
          </>
        ),
        placement: "bottom",
      });
    } else {
      notification.error({
        message: `Create Event Fail`,
        description: "",
        placement: "bottom",
      });
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);

    const body = {
      subject: values.subject,
      start: {
        dateTime: moment(values.date[0]).toISOString(),
      },
      end: {
        dateTime: moment(values.date[1]).toISOString(),
      },
      attendees: values.attendee
        ? values.attendee.map((item: any) => {
            return item.email;
          })
        : [],
    };
    console.log("🐱  onFinish ~ body", body);

    try {
      const res = await axios.post(URL + "/api/events", body);
      console.log("🐱 onFinish ~ res", res);

      openNotification(AlertType.Success, res.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log("error", error);
    }
  };

  return (
    <div className="container">
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
          <RangePicker
            allowClear
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
        {/* <Form.Item
          name="switch"
          label="All Day"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item> */}
        <Form.List name="attendee">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                  className="space"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "email"]}
                    rules={[{ type: "email" }]}
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
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
