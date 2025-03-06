import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { Course } from '../../models/questionbank';

interface QuestionFormProps {
    onSubmit: (values: any) => void;
    courses: Course[];  // Thêm prop courses
    initialValues?: any;
    isModal?: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, courses, initialValues, isModal }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            initialValues={initialValues}
        >
            <Form.Item 
                name="courseId" 
                label="Course" 
                rules={[{ required: true, message: 'Please select a course' }]}
            >
                <Select placeholder="Select a course">
                    {courses.map(course => (
                        <Select.Option key={course.id} value={course.id}>
                            {course.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item 
                name="content" 
                label="Question Content" 
                rules={[{ required: true, message: 'Please input question content' }]}
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item 
                name="difficultyLevel" 
                label="Difficulty Level" 
                rules={[{ required: true, message: 'Please select difficulty level' }]}
            >
                <Select>
                    <Select.Option value="Easy">Easy</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="Hard">Hard</Select.Option>
                    <Select.Option value="Very Hard">Very Hard</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item 
                name="knowledgeArea" 
                label="Knowledge Area" 
                rules={[{ required: true, message: 'Please input knowledge area' }]}
            >
                 <Select placeholder="Select a knowledge area">
    {courses.flatMap(course =>
        course.knowledgeAreas.map((area, index) => (
            <Select.Option key={`${course.id}-${index}`} value={area}>
                {area}
            </Select.Option>
        ))
    )}
</Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    {isModal ? 'Add Question' : 'Save'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default QuestionForm;
