import React, { useState } from 'react';
import { Form, Select, InputNumber, Button, Table, Alert, Modal } from 'antd';
import { useModel } from 'umi';

interface TestPaperGeneratorProps {
    isModal?: boolean;
    onClose?: () => void;
}

const TestPaperGenerator: React.FC<TestPaperGeneratorProps> = ({ isModal, onClose }) => {
    const { courses, testPapers, generateTestPaper, questions } = useModel('questionbank');
    const [form] = Form.useForm();
    const [generatedTestPaper, setGeneratedTestPaper] = useState<any>(null);

    const handleSubmit = (values: any) => {
        try {
            const difficultyDistribution = {
                'Easy': values.easyQuestions || 0,
                'Medium': values.mediumQuestions || 0,
                'Hard': values.hardQuestions || 0,
                'Very Hard': values.veryHardQuestions || 0
            };

            const knowledgeAreaDistribution = {};
            (values.knowledgeAreas || []).forEach((area: string) => {
                knowledgeAreaDistribution[area] = 
                    values[`${area}_count`] || 0;
            });

            const testPaper = generateTestPaper(
                values.courseId, 
                difficultyDistribution, 
                knowledgeAreaDistribution
            );

            setGeneratedTestPaper(testPaper);
        } catch (error) {
            Modal.error({
                title: 'Test Generation Error',
                content: error.message
            });
        }
    };

    // Get knowledge areas for selected course
    const getKnowledgeAreas = (courseId: string) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.knowledgeAreas : [];
    };

    const testPaperColumns = [
        {
            title: 'Question',
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

    const testHistoryColumns = [
        {
            title: 'Course',
            dataIndex: 'courseName',
            key: 'courseName',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Number of Questions',
            key: 'questionCount',
            render: (record) => record.questions.length
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

                <Form.Item label="Questions by Difficulty">
                    <Form.Item name="easyQuestions" noStyle>
                        <InputNumber placeholder="Easy Questions" min={0} style={{ width: '25%', marginRight: 8 }} />
                    </Form.Item>
                    <Form.Item name="mediumQuestions" noStyle>
                        <InputNumber placeholder="Medium Questions" min={0} style={{ width: '25%', marginRight: 8 }} />
                    </Form.Item>
                    <Form.Item name="hardQuestions" noStyle>
                        <InputNumber placeholder="Hard Questions" min={0} style={{ width: '25%', marginRight: 8 }} />
                    </Form.Item>
                    <Form.Item name="veryHardQuestions" noStyle>
                        <InputNumber placeholder="Very Hard Questions" min={0} style={{ width: '25%' }} />
                    </Form.Item>
                </Form.Item>

                <Form.Item 
                    name="knowledgeAreas" 
                    label="Knowledge Areas"
                    dependencies={['courseId']}
                >
                    <Select 
                        mode="multiple" 
                        placeholder="Select knowledge areas"
                        disabled={!form.getFieldValue('courseId')}
                    >
                        {form.getFieldValue('courseId') && 
                            getKnowledgeAreas(form.getFieldValue('courseId')).map(area => (
                                <Select.Option key={area} value={area}>
                                    {area}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                {form.getFieldValue('knowledgeAreas')?.map((area: string) => (
                    <Form.Item 
                        key={area} 
                        name={`${area}_count`} 
                        label={`${area} Questions`}
                    >
                        <InputNumber min={0} placeholder={`Number of questions for ${area}`} />
                    </Form.Item>
                ))}

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Generate Test Paper
                    </Button>
                </Form.Item>
            </Form>

            {generatedTestPaper && (
                <div style={{ marginTop: 16 }}>
                    <h2>Generated Test Paper</h2>
                    <Table 
                        columns={testPaperColumns} 
                        dataSource={generatedTestPaper.questions} 
                        rowKey="id"
                    />
                </div>
            )}

            <div style={{ marginTop: 16 }}>
                <h2>Test Paper History</h2>
                <Table 
                    columns={testHistoryColumns} 
                    dataSource={testPapers} 
                    rowKey="id"
                />
            </div>
        </div>
    );
};

export default TestPaperGenerator; 