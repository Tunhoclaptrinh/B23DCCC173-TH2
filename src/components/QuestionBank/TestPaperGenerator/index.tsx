import React, { useState } from 'react';
import { Form, Select, InputNumber, Button, Table, Modal } from 'antd';
import { useModel } from 'umi';

const TestPaperGenerator = () => {
    const { courses, generateTestPaper, testPapers, setTestPapers } = useModel('questionbank');
    const [form] = Form.useForm();
    const [generatedTestPaper, setGeneratedTestPaper] = useState(null);
    const [editingTestPaper, setEditingTestPaper] = useState(null); // Trạng thái sửa đề

    const handleSubmit = (values) => {
        try {
            const difficultyDistribution = {
                'Easy': values.easyQuestions || 0,
                'Medium': values.mediumQuestions || 0,
                'Hard': values.hardQuestions || 0,
                'Very Hard': values.veryHardQuestions || 0
            };

            const knowledgeAreaDistribution = {};
            (values.knowledgeAreas || []).forEach(area => {
                knowledgeAreaDistribution[area] = values[`${area}_count`] || 0;
            });

            const testPaper = generateTestPaper(values.courseId, difficultyDistribution, knowledgeAreaDistribution);
            
            if (!testPaper || !testPaper.id) {
                throw new Error("Failed to generate a valid test paper.");
            }

            setGeneratedTestPaper(testPaper);
        } catch (error) {
            console.error("Error generating test paper:", error);
            Modal.error({ title: 'Error', content: error.message });
        }
    };

    // Xóa đề thi
    const deleteTestPaper = (testPaperId) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this test paper?',
            onOk: () => {
                setTestPapers(prevTestPapers => prevTestPapers.filter(tp => tp.id !== testPaperId));
                localStorage.setItem('testPapers', JSON.stringify(testPapers.filter(tp => tp.id !== testPaperId)));
            }
        });
    };

    // Chỉnh sửa đề thi
    const editTestPaper = (testPaper) => {
        setEditingTestPaper(testPaper);
        Modal.info({
            title: 'Edit Test Paper',
            content: (
                <div>
                    <p><strong>Course:</strong> {testPaper.courseName}</p>
                    <p><strong>Created At:</strong> {testPaper.createdAt}</p>
                    <p><strong>Total Questions:</strong> {testPaper.questions.length}</p>
                    <Table 
                        columns={[
                            { title: 'Question ID', dataIndex: 'id', key: 'id' },
                            { title: 'Content', dataIndex: 'content', key: 'content' },
                            { title: 'Difficulty', dataIndex: 'difficultyLevel', key: 'difficultyLevel' },
                            { title: 'Knowledge Area', dataIndex: 'knowledgeArea', key: 'knowledgeArea' }
                        ]} 
                        dataSource={testPaper.questions} 
                        rowKey="id" 
                    />
                </div>
            ),
            onOk() {
                setEditingTestPaper(null);
            }
        });
    };

    return (
        <div>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item name="courseId" label="Course" rules={[{ required: true }]}> 
                    <Select placeholder="Select a course">
                        {courses.map(course => (
                            <Select.Option key={course.id} value={course.id}>{course.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Questions by Difficulty">
                    <Form.Item name="easyQuestions" noStyle><InputNumber placeholder="Easy" min={0} /></Form.Item>
                    <Form.Item name="mediumQuestions" noStyle><InputNumber placeholder="Medium" min={0} /></Form.Item>
                    <Form.Item name="hardQuestions" noStyle><InputNumber placeholder="Hard" min={0} /></Form.Item>
                    <Form.Item name="veryHardQuestions" noStyle><InputNumber placeholder="Very Hard" min={0} /></Form.Item>
                </Form.Item>

                <Form.Item name="knowledgeAreas" label="Knowledge Areas">
                    <Select mode="multiple" placeholder="Select areas">
                        {courses.find(c => c.id === form.getFieldValue('courseId'))?.knowledgeAreas.map(area => (
                            <Select.Option key={area} value={area}>{area}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item><Button type="primary" htmlType="submit">Generate</Button></Form.Item>
            </Form>

            {/* Hiển thị đề thi đã tạo */}
            {generatedTestPaper && (
                <div>
                    <h2>Generated Test Paper</h2>
                    <p><strong>Course:</strong> {generatedTestPaper.courseName}</p>
                    <p><strong>Created At:</strong> {generatedTestPaper.createdAt}</p>
                    <p><strong>Total Questions:</strong> {generatedTestPaper.questions.length}</p>
                    <Table 
                        columns={[
                            { title: 'Question ID', dataIndex: 'id', key: 'id' },
                            { title: 'Content', dataIndex: 'content', key: 'content' },
                            { title: 'Difficulty', dataIndex: 'difficultyLevel', key: 'difficultyLevel' },
                            { title: 'Knowledge Area', dataIndex: 'knowledgeArea', key: 'knowledgeArea' }
                        ]} 
                        dataSource={generatedTestPaper.questions} 
                        rowKey="id" 
                    />
                </div>
            )}

            {/* Hiển thị lịch sử các đề thi đã tạo */}
            <h2>Test Paper History</h2>
            <Table
                columns={[
                    { title: 'Course', dataIndex: 'courseName', key: 'courseName' },
                    { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
                    { title: 'Total Questions', dataIndex: 'questions', key: 'questions', render: (questions) => questions.length },
                    { title: 'Questions', key: 'questions_list', render: (_, record) => (
                        <ul>
                            {record.questions.slice(0, 5).map(q => (
                                <li key={q.id}>{q.content} ({q.difficultyLevel})</li>
                            ))}
                            {record.questions.length > 5 && <li>...</li>}
                        </ul>
                    )},
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <>
                                <Button onClick={() => editTestPaper(record)} style={{ marginRight: 8 }}>Edit</Button>
                                <Button danger onClick={() => deleteTestPaper(record.id)}>Delete</Button>
                            </>
                        )
                    }
                ]}
                dataSource={testPapers}
                rowKey="id"
            />
        </div>
    );
};

export default TestPaperGenerator;
