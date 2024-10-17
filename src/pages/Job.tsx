import React, { useEffect, useState } from "react";
import { setCompany } from "../store/slices/companyslice";
import { setJob } from "../store/slices/jobslice";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { CompanyType, JobType } from "../type";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Space,
} from "antd";
import { RootState } from "../store";
import { Table } from "antd";
import type { SelectProps, TableColumnsType } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
export const Job = () => {
  const company = useSelector((state: RootState) => state.company.company);
  const job = useSelector((state: RootState) => state.job.job);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentJob, setCurrentJob] = useState<JobType | null>(null);

  const deleteProd = (id: number) => {
    const jobs = job.filter((job: JobType) => job.id != id);
    dispatch(setJob(jobs));
    return jobs ? jobs : job;
  };

  const columns: TableColumnsType<JobType> = [
    {
      title: "Company",
      dataIndex: "companyId",
      key: "companyId",
      render: (text: any, record: JobType, index: number) => {
        const branch = company.find((branch) => record.companyId == branch.id);
        return branch ? branch.title : "-";
      },
    },
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Technologies",
      dataIndex: "technologies",
      key: "technologies",
      render: (text: any, record: JobType, index: number) => {
        return record.technologies
          ? record.technologies.map((item: string) => {
              return (
                <div key={item} className="flex flex-col gap-1">
                  <p>{item}</p>
                </div>
              );
            })
          : "-";
      },
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text: any, record: JobType, index: number) => {
        return record.location ? record.location : "-";
      },
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      render: (text: any, record: JobType, index: number) => {
        return record.salary ? record.salary + "$" : "";
      },
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text: any, record: JobType, index: number) => {
        return record.phone ? record.phone : "-";
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any, record: JobType, index: number) => {
        return record.email ? record.email : "-";
      },
    },
    {
      title: "Telegram",
      dataIndex: "telegram",
      key: "telegram",
      render: (text: any, record: JobType, index: number) => {
        return record.telegram ? record.telegram : "-";
      },
    },
    {
      title: "Instagram",
      dataIndex: "instagram",
      key: "instagram",
      render: (text: any, record: JobType, index: number) => {
        return record.instagram ? record.instagram : "-";
      },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text: any, record: JobType, index: number) => {
        return (
          <>
            {" "}
            <div>
              <Button
                className="me-3"
                onClick={() => {
                  deleteProd(record.id);
                }}
              >
                <FaRegTrashAlt />
              </Button>
              <Button onClick={() => showDrawer(record)}>
                <FaPen />
              </Button>{" "}
            </div>
          </>
        );
      },
    },
  ];
  const data: JobType[] = job;

  const showDrawer = (item?: JobType) => {
    if (item) {
      setCurrentJob(item);
      form.setFieldsValue(item);
    } else {
      setCurrentJob(null);
      form.resetFields();
    }
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values: JobType) => {
    if (currentJob) {
      const updatedJob = job.map((job) =>
        job.id === currentJob.id ? { ...job, ...values } : job
      );
      dispatch(setJob(updatedJob));
    } else {
      const newJob = { ...values, id: job.length + 1 };
      dispatch(setJob([...job, newJob]));
    }
    onClose();
  };

  const companyname = company.map((item: CompanyType) => {
    return {
      value: item.title,
      label: item.title,
    };
  });
  console.log("compani name", companyname, company);

  const options: SelectProps["options"] = companyname;

  // const handleChange = (value: { value: string; label: React.ReactNode }) => {
  //   console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  //   const updatedJob = job.map((job) => {
  //     const updateCompany = company.find(
  //       (item: CompanyType) => item.title == value.value
  //     );
  //     return updateCompany?.id ? (job.companyId = updateCompany.id) : job;
  //   });
  //   console.log("update", updatedJob);

  //   dispatch(setJob(updatedJob));
  // };

  return (
    <div className=" bg-white ">
      <Button type="primary" onClick={() => showDrawer()}>
        ADD
      </Button>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title={currentJob ? "Edit Job" : "Add Job"}
        placement="right"
        onClose={onClose}
        open={visible}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "write title",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="desc"
            label="Description"
            rules={[
              {
                required: true,
                message: "write description",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Select
                // size={size}
                defaultValue={{ value: "Exadel", label: "Exadel" }}
                onChange={handleChange}
                style={{ width: 200 }}
                options={options}
              />
            </Space>
          </Form.Item> */}
          <Form.Item
            name="salary"
            label="salary"
            rules={[
              {
                required: true,
                message: "write salary",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name="location" label="location">
            <Input />
          </Form.Item>{" "}
          <Form.Item name="phone" label="phone">
            <Input />
          </Form.Item>{" "}
          <Form.Item name="email" label="email">
            <Input />
          </Form.Item>{" "}
          <Form.Item name="telegram" label="telegram">
            <Input />
          </Form.Item>{" "}
          <Form.Item name="instagram" label="instagram">
            <Input />
          </Form.Item>{" "}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

const StyledChart = styled("div")<{
  terminall: number;
  paymee: number;
  naxtt: number;
  totall: number;
}>`
  .chart-terminal {
    background-color: #eab308;
    width: ${(props) =>
      props.totall !== 0 ? (props.terminall / props.totall) * 100 : 0}%;
    height: 100%;
  }
  .chart-payme {
    background-color: #22c55e;
    width: ${(props) =>
      props.totall !== 0 ? (props.paymee / props.totall) * 100 : 0}%;
    height: 100%;
  }
  .chart-naxt {
    background-color: #3ef8f8;
    width: ${(props) =>
      props.totall !== 0 ? (props.naxtt / props.totall) * 100 : 0}%;
    height: 100%;
  }
`;
