import React, { useEffect, useState } from "react";
import { setCompany } from "../store/slices/companyslice";
import { useSelector, useDispatch } from "react-redux";
import { CompanyType } from "../type";
import { RootState } from "../store";
import { Button, Drawer, Input } from "antd";
import { Table, Form } from "antd";
import type { TableColumnsType } from "antd";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

export const Company = () => {
  const company = useSelector((state: RootState) => state.company.company);
  const job = useSelector((state: RootState) => state.job.job);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentCompany, setCurrentCOmpany] = useState<CompanyType | null>(
    null
  );

  const deleteProd = (id: number) => {
    const companies = company.filter((comp: CompanyType) => comp.id != id);
    dispatch(setCompany(companies));
    console.log("companies", companies);

    return companies ? companies : company;
  };

  const columns: TableColumnsType<CompanyType> = [
    {
      title: " ",
      dataIndex: "image",
      key: "image",
      render: (text: any, record: CompanyType, index: number) => {
        return (
          <div className="w-[40px] h-[40px] rounded-full">
            <img src={record.image} alt="" />
          </div>
        );
      },
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "desc", key: "desc" },
    { title: "Website", dataIndex: "website", key: "website" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text: any, record: CompanyType, index: number) => {
        console.log("record", record, record.id);

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
  const data: CompanyType[] = company;

  const showDrawer = (item?: CompanyType) => {
    if (item) {
      setCurrentCOmpany(item);
      form.setFieldsValue(item);
    } else {
      setCurrentCOmpany(null);
      form.resetFields();
    }
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values: CompanyType) => {
    if (currentCompany) {
      const updatedCompany = company.map((company) =>
        company.id === currentCompany.id ? { ...company, ...values } : company
      );
      dispatch(setCompany(updatedCompany));
    } else {
      const newCompany = { ...values, id: company.length + 1 };
      dispatch(setCompany([...company, newCompany]));
    }
    onClose();
  };

  return (
    <div className=" bg-white ">
      <Button type="primary" onClick={() => showDrawer()}>
        ADD
      </Button>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title={currentCompany ? "Edit Company" : "Add Company"}
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
          <Form.Item name="desc" label="Description">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image">
            <Input />
          </Form.Item>{" "}
          <Form.Item name="website" label="Website">
            <Input />
          </Form.Item>
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
