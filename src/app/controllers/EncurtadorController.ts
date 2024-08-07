import {Request, Response} from "express";
import Url from '../../shared/models/url.model';
import shortid from "shortid";

class EncurtadorController {
    public async encurtar(req: Request, res: Response): Promise<any> {
        const { originalUrl, expiresIn } = req.body;
        try {
            // Verificar se a URL já foi encurtada
            let url = await Url.findOne({ originalUrl });
            if (url) {
                // Se a URL já foi encurtada, retornar a URL encurtada existente
                res.json(url);
            } else {
                // Se a URL não foi encurtada, criar uma nova URL encurtada
                const shortUrl = shortid.generate();
                const expiresAt = new Date(Date.now() + expiresIn * 1000); // expiresIn em segundos
                url = new Url({ originalUrl, shortUrl, expiresAt });
                await url.save();
                res.json(url);
            }
        } catch (err) {
            res.status(500).json({error: 'Internal server error'});
        }
    }

    public async pegarUrl(req: Request, res: Response): Promise<any> {
        try {
            const { shortUrl } = req.params;
            const url = await Url.findOne({ shortUrl });
            if (url) {
                if (new Date() > url.expiresAt) {
                    res.status(410).json('URL expired'); // 410 Gone
                } else {
                    res.redirect(url.originalUrl);
                }
            } else {
                res.status(404).json('URL not found');
            }
        } catch (err) {
            return res.status(500).send({error: 'Erro interno'});
        }
    }
}

export default new EncurtadorController()
