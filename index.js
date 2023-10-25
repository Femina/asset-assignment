const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
let employees = [
    { id: 1, fullname: 'John Doe', company:'LinkViva', position: 'Manager', mobile: '971555555555', emiratesID:'784199655559098' }
  ];

const assetAssignments = [
    { assetNumber: '12345', assignedTo: 'John Doe' , assignmentDate:'10/25/2023' },
    { assetNumber: '67890', assignedTo: 'Alice Smith', assignmentDate:'10/25/2023' },
];

app.get('/status', (request, response) => {
    const status = {
       'Status': 'Running'
    };
    
    response.send(status);
 });

 app.get('/addEmployees', (request, response) => {
    const { fullname, company, position, mobile, emiratesID } = req.body;
    const id = employees.length + 1;
    const newEmployee = { id, fullname, company, position,mobile,emiratesID };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
 });

app.put('/employees/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { fullname, company, position, mobile, emiratesID } = req.body;
  const employee = employees.find((e) => e.id === id);

  if (!employee) {
    return res.status(404).json({ error: 'Employee not found' });
  }

  employee.fullname = fullname;
  employee.company = company;
  employee.position = position;
  employee.mobile = mobile;
  employee.emiratesID = emiratesID;
  res.json(employee);
});

app.post('/assignAsset', (req, res) => {
    const { employeeName, assetNumber, assignmentDate } = req.body;
    const assignment = assetAssignments.find((assignment) => assignment.assetNumber === assetNumber);
    if (!assignment) {
    const assignmentStatus = `Assigned ${assetNumber} to ${employeeName} on ${assignmentDate}.`;
    assetAssignments.push({assetNumber: assetNumber, assignedTo: employeeName , assignmentDate: assignmentDate  })
    res.json({ status: assignmentStatus });
    }
    else
    res.json({ status: "Failed" });
});

app.post('/checkAssetAssignment', (req, res) => {
    const assetNumber = req.body.assetNumber;

    const assignment = assetAssignments.find((assignment) => assignment.assetNumber === assetNumber);

    if (assignment) {
        res.json({ assigned: true, assignedTo: assignment.assignedTo });
    } else {
        res.json({ assigned: false });
    }
});
app.get('/getAllAssetAssignments', (req, res) => {
    res.json({ assetAssignments: assetAssignments });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
