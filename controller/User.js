const {User} = require('../models');
const Joi = require('@hapi/joi');

exports.postUser = async(req,res) =>{
    try{
        const schema = Joi.object({
            name: Joi.string().required(),
            tingkat: Joi.string().required(),
            cabang: Joi.string().required(),
            lulus: Joi.string().required(),
            nohp: Joi.string().required()
          });
        const { error } = schema.validate(req.body);
      
          if (error)
            res.status(400).send({
              error: {
                message: error.details[0].message,
              },
            });

        

        const { name,lulus } = req.body;
        const user = await User.findOne({
            where: {
            name,
            lulus
            },
            attributes: {
				exclude: ['createdAt','updatedAt']
			}
        });

        if (!user){
            const user = await User.create({
            ...req.body
            });
            return res.status(200).send({
                massage:'Success add Alumni ' + name,
                user
            })
        }else{
            res.status(400).send({
                massage:'User sudah ada'
            })
        }
             
        
    }catch(err){
        return res.status(500).send({
            massage:'Server Error'
        })
    }
}
exports.getUser = async (req, res) => {
	try {
		const user = await User.findAll({
			attributes: {
				exclude: ['createdAt','updatedAt']
			}
		});

		if (user) {
			return res.send({
                massage:'Get User Success',
				data: user
			});
		} else {
			return res.status(500).send({
				message: 'Server Error'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				id
			}
		});
		if (user) {
			const deleteUser = await User.destroy({
				where: {
					id
				}
			});
			return res.send({
				data: {
					id
				}
			});
		} else {
			return res.status(400).send({
				error: {
					message: 'User Not Found'
				}
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).send({
			error: {
				message: 'Server Error'
			}
		});
	}

};