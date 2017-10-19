var express = require('express');  
var router = express.Router();  
var ids = require('../models/ids');  
router.get('/:id?', function(req, res, next) {  
    if (req.params.id) {  
        ids.getidsById(req.params.id, function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
    } else {  
        ids.getAllids(function(err, rows) {  
            if (err) {  
                res.json(err);  
            } else {  
                res.json(rows);  
            }  
        });  
    }  
});  
router.post('/', function(req, res, next) {  
    ids.addids(req.body, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            console.log(req.body);
            res.json(req.body); //or return count for 1 & 0  
        }  
    });  
});  
router.delete('/:id', function(req, res, next) {  
    ids.deleteids(req.params.id, function(err, count) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(count);  
        }  
    });  
});  
router.put('/:id', function(req, res, next) {  
    ids.updateids(req.params.id, req.body, function(err, rows) {  
        if (err) {  
            res.json(err);  
        } else {  
            res.json(rows);  
        }  
    });  
});  
module.exports = router;  
