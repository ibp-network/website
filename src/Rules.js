import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges } from 'reactflow';
import 'reactflow/dist/style.css';
import { Handle, Position,
  Controls,
  Background } from 'reactflow';
import proMilestones from './promilestones.json'
import hobbyistMilestones from './hobbyistmilestones.json'
import thousandMilestones from './1kv.json'

//Contains the JSON files for each routes (Hobbyist, Pro, PreRequisite)
const thousand  = thousandMilestones;
const pro       = proMilestones;
const hobby     = hobbyistMilestones;

function setNodes(nodeList, edgeList, json, type){

  var y = 0;
  var x = 3;
  if(type === "hobbyist"){
    y = 1000;
  }
  else if(type === '1kv'){
    y = 500;
    x = 0;
  }
  for(var i = 0; i < json.length; i++){
    var node = {id: '', type: 'textUpdater', position: {x: 0, y: y}, data:''};
    var edge = {id: '', source: '', target: ''};

    node.id = type + "-node-" + (i + 1);
    node.position.x = (i+x) * 400;
    node.data = json[i];
    nodeList.push(node);

    edge.id = type + "-edge-" + (i+1);
    edge.source = node.id;
    edge.target = type + '-node-' + (i + 2);

    edgeList.push(edge);

  }
}



var initialNodes = [];
var initialEdges = [];

setNodes(initialNodes, initialEdges, pro, "pro");
setNodes(initialNodes, initialEdges, hobby, "hobbyist");
setNodes(initialNodes, initialEdges, thousand, "1kv");

var labelStyling = { fill: '#f4f4f4', fontWeight: '500', fontFamily: 'GTAmerica', fontSize: '1.5rem'};
var labelBackground = { fill: 'none'}
initialEdges.push({id: 'choose-edge-3', source: '1kv-node-2', animated: true, target: 'pro-node-1', type: 'smoothstep', label: 'pro path', labelStyle: labelStyling, labelBgStyle: labelBackground});
initialEdges.push({id: 'choose-edge-4', source: '1kv-node-2', animated: true, target: 'hobbyist-node-1',  type: 'smoothstep', label: 'hobbyist path',  labelStyle: labelStyling, labelBgStyle: labelBackground});


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode, singleNode: SingleNode };

export default function Rules() {
  document.title = 'IBP | Member Milestones';

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className={'inline-flex'} style={{overflow: 'none'}}>
      <div style={{ width: '100vw', height: '100vh'}}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}

          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultViewport={{x: 400, y: 125, zoom: 0.55}}
          minZoom={0.5}
        >
        <Controls />

        <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
function SingleNode({isConnectable}){
  return(
    <>
    <div className="single-node">
    <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    <div style={{display: 'block', width: '1px', height: '1px'}}/>
    <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
    </div>
    </>
  )
}
function TextUpdaterNode({ data, isConnectable }) {
  var [display, changeDisplay] = useState('hide');
  var [collapseText, changeText] = useState('EXPAND');

  //EXTRAS
  var tasks = [];
  var taskRewards = [];
  var taskBlocks = [];


  if(data.tasks){
    for(var i = 0; i < data.tasks.length; i++){
      tasks.push(setList(data.tasks[i]));
      taskRewards.push(setList(data.taskreward[i]));
      taskBlocks.push(<TaskBlock task={tasks[i]} reward={taskRewards[i]} index={i + 1}/>);
    }

  }


  function clickExpand(){
    if(display === 'show'){
      changeDisplay('hide');
      changeText('EXPAND');
    }
    else{
      changeDisplay('show');
      changeText('COLLAPSE');
    }
  }
  return (
    <div className="text-updater-node">
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
      <div className='node node'>

        <div className='flex col center node-block'>
          <h1 className='node'> {data.index} </h1>
          <h2 className={`node ${data.type}`}>{data.type}</h2>
          <p className='node-desc'>
            {data.desc}
          </p>
        </div>

        <div className={`node-description ${display}`} >
            <CollapseBlock title={'incorporation'} content={data.incorporation}/>
            <CollapseBlock title={'resume'} content={data.resume}/>
            <CollapseBlock title={'location'} content={data.location}/>
            <CollapseBlock title={'renewable'} content={data.renewable}/>
            <CollapseBlock title={'sign + verify'} content={data.sign}/>

            <CollapseBlock title={'rankings'} content={data.rankings}/>

            <NodeBlock title={'reward'} content={data.reward}/>
            <CollapseBlock title={'regional payments'} content={data.region}/>
            <NodeBlock title={'cost'} content={data.cost}/>
            <NodeBlock title={'requirements'} content={data.req}/>
            {taskBlocks}
            <NodeBlock title={'service level agreement'} content={data.sla}/>
        </div>

      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
      />

      <div className='collapsible flex center' onClick={() => {clickExpand()}}>
        <h4 className='node'>{collapseText}</h4>
      </div>
    </div>
  );
}

function NodeBlock({title, content}){
  if(content){
    var list = setList(content);
    return(
      <>
          <div className='node-block'>
            <h3 className='node-subheader'>{title}</h3>
            <ul className='node-list'>
              {list}
            </ul>
          </div>
        <br/>
        <div className='underline-full'/>
      </>
    )
  }

  return(<></>);
}

function TaskBlock({task, reward, index}){
  var [display, changeDisplay] = useState('hide');
  function clickExpand(){
    if(display === 'hide'){
      changeDisplay('show');
    }
    else{
      changeDisplay('hide');
    }
  }
  if(task){
    return(
      <>
        <div className='collapsible-container'>
          <div onClick={() => clickExpand()} className={'flex col center task-collapse'}>
            <h4 className='node-subheader'>{`task ${index}`}</h4>
          </div>
          <div className={`node-block ${display}`}>
            <ul className='node-list'>
              {task}
            </ul>

            <h3 className='node-subheader'>{`reward`}</h3>
            <ul className='node-list'>
              {reward}
            </ul>

          </div>

        </div>
      </>
    );
  }

  return(<></>);
}

function CollapseBlock({title, content, details}){
  var [display, changeDisplay] = useState('hide');
  function clickExpand(){
    if(display === 'hide'){
      changeDisplay('show');
    }
    else{
      changeDisplay('hide');
    }
  }

  if(content){
    var list = setList(content);
    return(<>
      <div className='collapsible-container'>
        <div onClick={() => clickExpand()} className={'flex col task-collapse'}>
          <h4 className='collapse node-subheader'>{title}</h4>
        </div>

        <div className={`node-block ${display}`}>
          <ul className='node-list'>
            {list}
          </ul>
        </div>

      </div>
    </>);
  }
}

function setList(list){
  var returnedList = [];
  if(list){
    for(var i = 0; i < list.length; i++){
      returnedList.push(<li>{list[i]}</li>);
    }
    return returnedList;
  }
  return;
}
