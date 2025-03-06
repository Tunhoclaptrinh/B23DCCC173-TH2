import React from 'react';
import { Form, Input, Select, Button, Table } from 'antd';
import { useModel } from 'umi';
import { v4 as uuidv4 } from 'uuid';
import QuestionForm from '../../components/Form/CourseForm';

interface QuestionManagementProps {
    isModal?: boolean;
    onClose?: () => void;
}

const QuestionManagement: React.FC<QuestionManagementProps> = ({ isModal, onClose }) => {
    const { courses, questions, addQuestion } = useModel('questionbank');
    const [form] = Form.useForm();

    const handleSubmit = (values: any) => {
        const newQuestion = {
            id: uuidv4(),
            courseId: values.courseId,
            content: values.content,
            difficultyLevel: values.difficultyLevel,
            knowledgeArea: values.knowledgeArea
        };


        addQuestion(newQuestion);
        form.resetFields();
        
        if (isModal && onClose) {
            onClose();
        }
    };

    const columns = [
        {
            title: 'Course',
            dataIndex: 'courseId',
            key: 'courseId', 
            render: (courseId: string) => 
                courses.find(c => c.id === courseId)?.name || courseId
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Difficulty',
            dataIndex: 'difficultyLevel',
            key: 'difficultyLevel',
        },
        {
            title: 'Knowledge Area',
            dataIndex: 'knowledgeArea',
            key: 'knowledgeArea',
        }
    ];

    return (
        <div>
            <Form 
                form={form}
                layout="vertical" 
                onFinish={handleSubmit}
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
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {isModal ? 'Add Question' : 'Save'}
                    </Button>
                </Form.Item>
            </Form>

            <Table 
                columns={columns} 
                dataSource={questions} 
                rowKey="id"
            />
        </div>
    );
};

export default QuestionManagement;