import React, { useState } from 'react';
import { Form, Select, Button, Table } from 'antd';
import { useModel } from 'umi';

const QuestionSearch: React.FC = () => {
    const { courses, questions, searchQuestions } = useModel('questionbank');
    const [form] = Form.useForm();
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const handleSearch = (values: any) => {
        const results = searchQuestions(
            values.courseId, 
            values.difficultyLevel, 
            values.knowledgeArea
        );
        setSearchResults(results);
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
                onFinish={handleSearch}
            >
                <Form.Item name="courseId" label="Course">
                    <Select placeholder="Select a course" allowClear>
                        {courses.map(course => (
                            <Select.Option key={course.id} value={course.id}>
                                {course.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="difficultyLevel" label="Difficulty Level">
                    <Select placeholder="Select difficulty level" allowClear>
                        <Select.Option value="Easy">Easy</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="Hard">Hard</Select.Option>
                        <Select.Option value="Very Hard">Very Hard</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="knowledgeArea" label="Knowledge Area">
                    <Select 
                        placeholder="Select knowledge area" 
                        allowClear
                        mode="multiple"
                    >
                        {Array.from(new Set(questions.map(q => q.knowledgeArea))).map(area => (
                            <Select.Option key={area} value={area}>
                                {area}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Search Questions
                    </Button>
                </Form.Item>
            </Form>

            <Table 
                columns={columns} 
                dataSource={searchResults} 
                rowKey="id"
                locale={{ emptyText: 'No questions found' }}
            />
        </div>
    );
}; 

export default QuestionSearch;