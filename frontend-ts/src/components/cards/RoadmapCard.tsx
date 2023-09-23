import { FC } from 'react';
import { List, Avatar, Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import type { DataNode } from 'antd/es/tree';

interface Task {
    _id: string;
    description: string;
    sub_tasks: Record<string, string>;
    title: string;
    url: string;
    image: string;
    status: number;
    year: string;
}

const convertDataToTreeData = (data: Task[]): DataNode[] => {
    const treeData: DataNode[] = [];

    data.forEach((task) => {
        const taskNode: DataNode = {
            title: task.title,
            key: task._id,
            children: [],
        };

        if (Object.keys(task.sub_tasks).length > 0) {
            const subTaskNode: DataNode = {
                title: 'Sub Tasks',
                key: `${task._id}-sub-tasks`,
                children: Object.entries(task.sub_tasks).map(([key, value]) => ({
                    title: value,
                    key: `${task._id}-${key}`,
                })),
            };

            taskNode.children?.push(subTaskNode);
        }

        treeData.push(taskNode);
    });

    console.log("------")
    console.log(treeData)

    return treeData;
};

interface RoadmapCardProps {
    data: Task[];
}

const RoadmapCard: FC<RoadmapCardProps> = ({ data }) => {
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 550,
                overflow: 'auto',
                padding: '0 12px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                borderRadius: '5px'
            }}
        >
            <List
                size="large"
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item._id}>
                        <List.Item.Meta
                            avatar={
                                item.image ? <Avatar src={item.image} /> : <Avatar>N/A</Avatar>
                            }
                            title={
                                <a href={item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                </a>
                            }
                            description={
                                Object.keys(item.sub_tasks).length > 0 ? (
                                    <Tree
                                        showLine
                                        switcherIcon={<DownOutlined />}
                                        treeData={convertDataToTreeData([item])}
                                    />
                                ) : (
                                    <p>No sub-tasks available</p>
                                )
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RoadmapCard;
