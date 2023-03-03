import { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from '@apollo/client';
import { ADD_CAR, GET_CARS } from '../../queries';

const { Option } = Select;

const AddCar = (props) => {
  const { people } = props;
  const [addCar] = useMutation(ADD_CAR);
  const getStyles = () => ({
    title: {
      fontSize: 22,
      color: '#333333',
    },
  });
  const styles = getStyles();
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, company, model, price, personId } = values;
    const id = uuidv4();

    addCar({
      variables: {
        id,
        year,
        company,
        model,
        price,
        personId,
      },
      refetchQueries: [{ query: GET_CARS, variables: { personId } }],
    });

    form.resetFields();
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        name="form-car-add"
        size="medium"
        layout="inline"
        style={{ marginBottom: '25px', width: '100%' }}
      >
        <Form.Item
          name="company"
          style={{ marginBottom: '10px', width: '22%' }}
          rules={[{ required: true, message: 'Please input car company!' }]}
        >
          <Input placeholder="Car Company" />
        </Form.Item>

        <Form.Item
          name="model"
          style={{ marginBottom: '10px', width: '22%' }}
          rules={[{ required: true, message: 'Please input car name!' }]}
        >
          <Input placeholder="Car Name" />
        </Form.Item>

        <Form.Item
          name="year"
          style={{ marginBottom: '10px' }}
          rules={[{ required: true, message: 'Please input car year!' }]}
        >
          <InputNumber placeholder="2023" max={2023} min={100} />
        </Form.Item>

        <Form.Item
          name="price"
          style={{ marginBottom: '8px' }}
          rules={[{ required: true, message: 'Please input car price!' }]}
        >
          <InputNumber
            min={2000}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>

        <Form.Item
          name="personId"
          style={{ marginBottom: '8px', width: '18%' }}
          rules={[{ required: true, message: 'Please select a person!' }]}
        >
          <Select placeholder="Select Person">
            {people.map((person) => (
              <Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
      <h2 style={styles.title}>Records</h2>
    </>
  );
};

export default AddCar;
